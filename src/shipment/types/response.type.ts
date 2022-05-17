import { ServiceType } from '../../constants/service-type.constants';
import { Carriers } from '../../constants/carriers.constants';

export interface ShipmentResponse {
  documents: string | string[];
  trackingNumber: string;
  carrierResponse: object;
  serviceType: ServiceType;
  carrier: Carriers;
}

export interface ShipmentRateResponse {
  totalCharges: number;
  currencyCode: string;
  serviceType: ServiceType;
  carrierResponse: object;
  carrier: Carriers;
}

export interface TrackResponse {
  status: string;
  date_time: string;
  location: string;
}
