import { ShipmentStatus } from './shipment-status.constants';

export enum CARRIER_UPDATE_MAP {
  // FEDEX
  'shipment information sent to fedex' = ShipmentStatus.MANIFEST,
  'your shipment data is lodged' = ShipmentStatus.MANIFEST,
  'picked up' = ShipmentStatus.PICKUP,
  'ready for recipient pickup' = ShipmentStatus.PICKUP,
  'weve collected your shipment' = ShipmentStatus.PICKUP,
  'arrived at fedex location' = ShipmentStatus.SHIPPING,
  'at local fedex facility' = ShipmentStatus.SHIPPING,
  'at destination sort facility' = ShipmentStatus.SHIPPING,
  'departed fedex location' = ShipmentStatus.SHIPPING,
  'on fedex vehicle for delivery' = ShipmentStatus.SHIPPING,
  'were processing your shipment' = ShipmentStatus.SHIPPING,
  'your shipments with a driver' = ShipmentStatus.SHIPPING,
  'weve delivered your shipment' = ShipmentStatus.DELIVERED,

  // DHL
  'shipment accepted' = ShipmentStatus.MANIFEST,
  'shipment picked up' = ShipmentStatus.PICKUP,
  'in transit' = ShipmentStatus.SHIPPING,
  'with delivery courier' = ShipmentStatus.SHIPPING,

  // UPS
  'manifest pickup' = ShipmentStatus.MANIFEST,
  'order processed ready for ups' = ShipmentStatus.MANIFEST,
  'shipper created a label ups has not received the package yet' = ShipmentStatus.MANIFEST,
  dropoff = ShipmentStatus.PICKUP,
  pickup = ShipmentStatus.PICKUP,
  'pickup scan' = ShipmentStatus.SHIPPING,
  'origin scan' = ShipmentStatus.SHIPPING,
  'departed from facility' = ShipmentStatus.SHIPPING,
  'arrived at facility' = ShipmentStatus.SHIPPING
}
