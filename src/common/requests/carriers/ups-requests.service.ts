import { HttpService } from '@nestjs/axios';
import { defaultConfig } from '../../../config';
import { lastValueFrom, map } from 'rxjs';
import { Injectable } from '@nestjs/common';
import {
  CarrierAuthInfo,
  ShipmentRequest,
} from '../../../shipment/types/request.type';
import {
  ShipmentRateResponse,
  ShipmentResponse,
  TrackResponse,
} from '../../../shipment/types/response.type';
import { BaseRequestsService } from './base-requests.service';

@Injectable()
export class UpsRequestsService extends BaseRequestsService {
  constructor(httpService: HttpService) {
    super(httpService);
  }

  createShipment(
    data: ShipmentRequest,
    token: string,
  ): Promise<ShipmentResponse> {
    const observable = this.httpService
      .post(`${defaultConfig.upsUrl}/shipment`, data, {
        headers: {
          authorization: token,
        },
      })
      .pipe(map((response) => response.data));
    return lastValueFrom(observable);
  }

  rateShipment(
    data: ShipmentRequest,
    token: string,
  ): Promise<ShipmentRateResponse> {
    const observable = this.httpService
      .post(`${defaultConfig.upsUrl}/shipment/rate`, data, {
        headers: {
          authorization: token,
        },
      })
      .pipe(map((response) => response.data));
    return lastValueFrom(observable);
  }

  trackShipment(
    data: CarrierAuthInfo,
    trackingNumber: string,
    token: string,
  ): Promise<TrackResponse[]> {
    const observable = this.httpService
      .post(`${defaultConfig.upsUrl}/shipment/${trackingNumber}`, data, {
        headers: {
          authorization: token,
        },
      })
      .pipe(map((response) => response.data));
    return lastValueFrom(observable);
  }
}
