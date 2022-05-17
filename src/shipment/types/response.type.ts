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

interface StandardizedTrackEventResponse {
  status: string;
  dateTime: string;
  location: string;
}

export interface TrackResponse {
  carrier: string;
  events: StandardizedTrackEventResponse[];
  carrierResponse: object;
}
