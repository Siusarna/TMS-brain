import { Injectable } from '@nestjs/common';
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
import { Repository } from 'typeorm';
import { ShipmentResponse } from './types/response.type';
import { BaseRequestsService } from '../common/requests/carriers/base-requests.service';

@Injectable()
export class ShipmentService {
  constructor(
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

  private processDocument(shipmentId: number, doc: string): Promise<Document> {
    const document = new Document({ shipmentId, documentUrl: doc });
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

  private async findTheBestCarrier(data: CreateShipmentDto): Promise<Carriers> {
    return Carriers.DHL;
  }

  private async getCarrierService(
    data: CreateShipmentDto,
  ): Promise<BaseRequestsService> {
    if (data.carrier) {
      return this.serviceRequestFactory.getService(data.carrier);
    } else {
      const foundCarrier = await this.findTheBestCarrier(data);
      return this.serviceRequestFactory.getService(foundCarrier);
    }
  }

  private async makeRequestToCarrier(
    data: CreateShipmentDto,
    carrierAuthInfo: AuthInfoType,
  ): Promise<ShipmentResponse> {
    const carrierClient = await this.getCarrierService(data);
    const { carrier, ...shipmentRequest } = data;
    return carrierClient.createShipment({
      ...shipmentRequest,
      ...carrierAuthInfo,
    });
  }

  async createShipment(userId: number, data: CreateShipmentDto) {
    const userAccount = await this.userAccountsService.findUserAccount(
      userId,
      data.carrier,
    );
    const carrierAuthInfo = this.getAuthInfoByCarrier(
      data.carrier,
      userAccount,
    );

    const response = await this.makeRequestToCarrier(data, carrierAuthInfo);

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
        carrier: data.carrier,
      }),
    );
    const items = await Promise.all(
      data.items.map(async (item) =>
        this.itemRepository.save(
          new Item({ ...item, shipmentId: shipment.id }),
        ),
      ),
    );

    const documents = await this.processAllDocuments(
      shipment.id,
      response.documents,
    );

    return await this.shipmentRepository.update(shipment.id, {
      items,
      documents,
    });
  }
}