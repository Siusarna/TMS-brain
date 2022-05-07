import { HttpService } from '@nestjs/axios';
import { defaultConfig } from '../../config';
import { lastValueFrom, map } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { ShipmentRequest } from '../../shipment/types/request.type';
import { ShipmentResponse } from '../../shipment/types/response.type';

@Injectable()
export class DhlRequestsService {
  constructor(private httpService: HttpService) {}

  createShipment(data: ShipmentRequest): Promise<ShipmentResponse> {
    const observable = this.httpService
      .post(`${defaultConfig.dhlUrl}/shipment`, data)
      .pipe(map((response) => response.data));
    return lastValueFrom(observable);
  }
}
