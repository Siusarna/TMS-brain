import { Injectable } from '@nestjs/common';
import { CreateShipmentDto } from './dtos/create-shipment.dto';
import { UserAccountsService } from '../user-accounts/user-accounts.service';
import { UserAccounts } from '../user-accounts/entities/user-accounts.entity';
import { Carriers } from '../constants/carriers.constants';
import { ServiceRequestsFactory } from '../common/requests/carriers/service-requests.factory';
import { AuthInfoType } from './types/auth-info.type';

@Injectable()
export class ShipmentService {
  constructor(
    private userAccountsService: UserAccountsService,
    private serviceRequestFactory: ServiceRequestsFactory,
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

  async createShipment(userId: number, data: CreateShipmentDto) {
    const userAccount = await this.userAccountsService.findUserAccount(
      userId,
      data.carrier,
    );
    const carrierAuthInfo = this.getAuthInfoByCarrier(
      data.carrier,
      userAccount,
    );
    const carrierClient = this.serviceRequestFactory.getService(data.carrier);
    const { carrier, ...shipmentRequest } = data;
    const response = await carrierClient.createShipment({
      ...shipmentRequest,
      ...carrierAuthInfo,
    });
    return response;
  }
}
