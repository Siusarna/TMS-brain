import { Injectable } from '@nestjs/common';
import { Carriers } from '../../../constants/carriers.constants';
import { UpsRequestsService } from './ups-requests.service';
import { HttpService } from '@nestjs/axios';
import { DhlRequestsService } from './dhl-requests.service';
import { FedexRequestsService } from './fedex-requests.service';

@Injectable()
export class ServiceRequestsFactory {
  constructor(private httpService: HttpService) {}

  getService(carrier: Carriers) {
    switch (carrier) {
      case Carriers.UPS:
        return new UpsRequestsService(this.httpService);
      case Carriers.DHL:
        return new DhlRequestsService(this.httpService);
      case Carriers.FEDEX:
        return new FedexRequestsService(this.httpService);
    }
  }
}
