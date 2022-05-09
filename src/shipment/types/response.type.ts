import { ServiceType } from '../../constants/service-type.constants';
import { Carriers } from '../../constants/carriers.constants';

export class ShipmentResponse {
  documents: string | string[];
  trackingNumber: string;
  carrierResponse: object;
  serviceType: ServiceType;
}

export interface ShipmentRateResponse {
  totalCharges: number;
  currencyCode: string;
  serviceType: ServiceType;
  carrierResponse: object;
  carrier: Carriers;
}
