import { HttpService } from '@nestjs/axios';
import {
  ShipmentRateResponse,
  ShipmentResponse, TrackResponse,
} from '../../../shipment/types/response.type';
import { CarrierAuthInfo, ShipmentRequest } from '../../../shipment/types/request.type';

export abstract class BaseRequestsService {
  protected constructor(protected httpService: HttpService) {
  }

  abstract createShipment(data: ShipmentRequest): Promise<ShipmentResponse>;

  abstract rateShipment(data: ShipmentRequest): Promise<ShipmentRateResponse>;

  abstract trackShipment(data: CarrierAuthInfo, trackingNumber: string): Promise<TrackResponse[]>
}
