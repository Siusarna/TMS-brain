import { ServiceType } from '../../constants/service-type.constants';

export class ShipmentResponse {
  documents: string | string[];
  trackingNumber: string;
  carrierResponse: unknown;
  serviceType: ServiceType;
}
