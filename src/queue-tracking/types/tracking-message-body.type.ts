import { TrackResponse } from '../../shipment/types/response.type';

export interface TrackingMessageBodyType extends TrackResponse {
  trackingNumber: string;
}
