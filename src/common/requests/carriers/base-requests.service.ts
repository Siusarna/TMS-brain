import { HttpService } from '@nestjs/axios';
import { ShipmentResponse } from '../../../shipment/types/response.type';
import { ShipmentRequest } from '../../../shipment/types/request.type';

export abstract class BaseRequestsService {
  protected constructor(protected httpService: HttpService) {}

  abstract createShipment(data: ShipmentRequest): Promise<ShipmentResponse>;
}
