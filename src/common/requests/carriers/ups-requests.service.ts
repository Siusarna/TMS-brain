import { HttpService } from '@nestjs/axios';
import { defaultConfig } from '../../../config';
import { lastValueFrom, map } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { ShipmentRequest } from '../../../shipment/types/request.type';
import { ShipmentResponse } from '../../../shipment/types/response.type';
import { BaseRequestsService } from './base-requests.service';

@Injectable()
export class UpsRequestsService extends BaseRequestsService {
  constructor(httpService: HttpService) {
    super(httpService);
  }

  createShipment(data: ShipmentRequest): Promise<ShipmentResponse> {
    const observable = this.httpService
      .post(`${defaultConfig.upsUrl}/shipment`, data)
      .pipe(map((response) => response.data));
    return lastValueFrom(observable);
  }
}
