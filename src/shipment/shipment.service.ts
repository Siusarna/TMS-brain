import { Injectable } from '@nestjs/common';
import { CreateShipmentDto } from './dtos/create-shipment.dto';
import { UserAccountsService } from '../user-accounts/user-accounts.service';
import { UserAccounts } from '../user-accounts/entities/user-accounts.entity';
import { Carriers } from '../constants/carriers.constants';

@Injectable()
export class ShipmentService {
  constructor(private userAccountsService: UserAccountsService) {}

  private getAuthInfoByCarrier(carrier: Carriers, userAccount: UserAccounts) {
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
  }
}
