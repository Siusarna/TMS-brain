import { HttpService } from '@nestjs/axios';
import { defaultConfig } from '../../../config';
import { lastValueFrom, map } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { CarrierAuthInfo, ShipmentRequest } from '../../../shipment/types/request.type';
import {
  ShipmentRateResponse,
  ShipmentResponse, TrackResponse,
} from '../../../shipment/types/response.type';
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

  rateShipment(data: ShipmentRequest): Promise<ShipmentRateResponse> {
    const observable = this.httpService
      .post(`${defaultConfig.dhlUrl}/shipment/rate`, data)
      .pipe(map((response) => response.data));
    return lastValueFrom(observable);
  }

  trackShipment(data: CarrierAuthInfo, trackingNumber: string): Promise<TrackResponse[]> {
    const observable = this.httpService
      .post(`${defaultConfig.dhlUrl}/shipment/${trackingNumber}`, data)
      .pipe(map((response) => response.data));
    return lastValueFrom(observable);
  }
}
