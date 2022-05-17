import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShipmentDto } from './dtos/create-shipment.dto';
import { UserAccountsService } from '../user-accounts/user-accounts.service';
import { UserAccounts } from '../user-accounts/entities/user-accounts.entity';
import { Carriers } from '../constants/carriers.constants';
import { ServiceRequestsFactory } from '../common/requests/carriers/service-requests.factory';
import { AuthInfoType } from './types/auth-info.type';
import { Address } from './entities/address.entity';
import { Item } from './entities/item.entity';
import { Shipment } from './entities/shipment.entity';
import { Document } from './entities/document.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Not, Repository } from 'typeorm';
import { ShipmentResponse, TrackResponse } from './types/response.type';
import { PaginationDto } from './dtos/pagination.dto';
import { ShipmentStatus } from '../constants/shipment-status.constants';
import { CARRIER_UPDATE_MAP } from '../constants/tracking-updates-map.constants';
import { AwsS3Service } from '../utils/aws-s3/aws-s3.service';
import { defaultConfig } from '../config';

@Injectable()
export class ShipmentService {
  constructor(
    private awsS3Service: AwsS3Service,
    private userAccountsService: UserAccountsService,
    private serviceRequestFactory: ServiceRequestsFactory,
    @InjectRepository(Shipment)
    private shipmentRepository: Repository<Shipment>,
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  private getAuthInfoByCarrier(
    carrier: Carriers,
    userAccount: UserAccounts,
  ): AuthInfoType {
    switch (carrier) {
      case Carriers.DHL: {
        return {
          login: userAccount.login,
          password: userAccount.password,
          shipmentNumber: userAccount.shipmentNumber,
        };
      }
      case Carriers.UPS: {
        return {
          login: userAccount.login,
          password: userAccount.password,
          licenseNumber: userAccount.licenceNumber,
          shipmentNumber: userAccount.shipmentNumber,
        };
      }
    }
  }

  private async processDocument(
    shipmentId: number,
    doc: string,
    docFormat: string = defaultConfig.docFormat,
  ): Promise<Document> {
    const uploadedFile = await this.awsS3Service.uploadFile(
      doc,
      `${shipmentId.toString()}.${docFormat.toLowerCase()}`,
    );
    const document = new Document({
      shipmentId,
      documentUrl: uploadedFile.Location,
    });
    return this.documentRepository.save(document);
  }

  private async processAllDocuments(
    shipmentId: number,
    docs: string | string[],
  ): Promise<Document[]> {
    if (Array.isArray(docs)) {
      return Promise.all(
        docs.map(async (document) =>
          this.processDocument(shipmentId, document),
        ),
      );
    } else {
      return [await this.processDocument(shipmentId, docs)];
    }
  }

  private async findTheBestCarrier(
    userId: number,
    data: CreateShipmentDto,
    token: string,
  ): Promise<Carriers> {
    const userActivatedCarriers =
      await this.userAccountsService.getUserAccounts(userId, {
        isActivated: true,
      });
    const responses = await Promise.all(
      userActivatedCarriers.map(async (userAccount) => {
        const authInfo = this.getAuthInfoByCarrier(
          userAccount.carrier,
          userAccount,
        );
        const client = this.serviceRequestFactory.getService(
          userAccount.carrier,
        );
        return client.rateShipment({ ...data, ...authInfo }, token);
      }),
    );

    responses.sort((a, b) => a.totalCharges - b.totalCharges);
    return responses[0].carrier;
  }

  private async makeRequestToCarrier(
    userId: number,
    data: CreateShipmentDto,
    token: string,
  ): Promise<ShipmentResponse> {
    const bestCarrier = data.carrier
      ? data.carrier
      : await this.findTheBestCarrier(userId, data, token);
    const userAccount = await this.userAccountsService.findUserAccount(
      userId,
      bestCarrier,
    );
    const carrierAuthInfo = this.getAuthInfoByCarrier(bestCarrier, userAccount);
    const carrierClient = this.serviceRequestFactory.getService(bestCarrier);
    const { carrier, ...shipmentRequest } = data;
    return carrierClient.createShipment(
      {
        ...shipmentRequest,
        ...carrierAuthInfo,
      },
      token,
    );
  }

  async getShipments(userId: number): Promise<Shipment[]> {
    return this.shipmentRepository.find({ userId });
  }

  async getShipmentsForTracking(
    pagination: PaginationDto,
  ): Promise<Shipment[]> {
    const now = new Date();
    now.setDate(now.getDate() - 1);
    return this.shipmentRepository.find({
      where: {
        status: Not(ShipmentStatus.DELIVERED),
        updatedAt: MoreThan(now),
      },
      order: {
        updatedAt: 'ASC',
      },
      take: pagination.limit,
      skip: pagination.skip,
    });
  }

  async createShipment(
    userId: number,
    data: CreateShipmentDto,
    token: string,
  ): Promise<Shipment> {
    const response = await this.makeRequestToCarrier(userId, data, token);

    const fromAddress = await this.addressRepository.save(
      new Address(data.from),
    );
    const toAddress = await this.addressRepository.save(new Address(data.to));
    const shipment = await this.shipmentRepository.save(
      new Shipment({
        userId,
        from: fromAddress,
        to: toAddress,
        trackingNumber: response.trackingNumber,
        serviceType: response.serviceType,
        carrierResponse: response.carrierResponse,
        carrier: response.carrier,
      }),
    );
    const items = await Promise.all(
      data.items.map(async (item) =>
        this.itemRepository.save(
          new Item({ ...item, shipmentId: shipment.id }),
        ),
      ),
    );

    shipment.documents = await this.processAllDocuments(
      shipment.id,
      response.documents,
    );
    shipment.items = items;

    return await this.shipmentRepository.save(shipment);
  }

  async trackShipment(
    userId: number,
    trackingNumber: string,
    token: string,
  ): Promise<TrackResponse[]> {
    const shipment = await this.shipmentRepository.findOne({
      userId,
      trackingNumber,
    });
    if (!shipment) {
      throw new NotFoundException(
        'Shipment with this tracking number doesnt found',
      );
    }
    const userAccount = await this.userAccountsService.findUserAccount(
      userId,
      shipment.carrier,
    );
    const carrierAuthInfo = this.getAuthInfoByCarrier(
      shipment.carrier,
      userAccount,
    );

    const carrierClient = this.serviceRequestFactory.getService(
      shipment.carrier,
    );
    const trackUpdates = await carrierClient.trackShipment(
      carrierAuthInfo,
      trackingNumber,
      token,
    );
    const normalizedStatus = CARRIER_UPDATE_MAP[trackUpdates[0].status];
    await this.shipmentRepository.update(shipment, {
      status: normalizedStatus,
    });
    return trackUpdates;
  }
}
