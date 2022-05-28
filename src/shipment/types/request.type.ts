import { ServiceType } from '../../constants/service-type.constants';
import { PickType } from '@nestjs/swagger';
import {AddressDto, ItemDto} from "../dtos/create-shipment.dto";

export enum ExportReasonType {
  PERMANENT = 'permanent',
  TEMPORARY = 'temporary',
  RETURN = 'return',
  USED_EXHIBITION_GOODS_TO_ORIGIN = 'used_exhibition_goods_to_origin',
  INTERCOMPANY_USE = 'intercompany_use',
  COMMERCIAL_PURPOSE_OR_SALE = 'commercial_purpose_or_sale',
  PERSONAL_BELONGINGS_OR_PERSONAL_USE = 'personal_belongings_or_personal_use',
  SAMPLE = 'sample',
  GIFT = 'gift',
  RETURN_TO_ORIGIN = 'return_to_origin',
  WARRANTY_REPLACEMENT = 'warranty_replacement',
  DIPLOMATIC_GOODS = 'diplomatic_goods',
  DEFENCE_MATERIAL = 'defence_material',
}

export enum Incoterm {
  EXW = 'EXW', // ExWorks
  FCA = 'FCA', // Free Carrier
  CPT = 'CPT', // Carriage Paid To
  CIP = 'CIP', // Carriage and Insurance Paid To
  DPU = 'DPU', // Delivered at Place Unloaded
  DAP = 'DAP', // Delivered at Place
  DDP = 'DDP', // Delivered Duty Paid
  FAS = 'FAS', // Free Alongside Ship
  FOB = 'FOB', // Free on Board
  CFR = 'CFR', // Cost and Freight
  CIF = 'CIF', // Cost, Insurance and Freight
}

export class ShipmentRequest {
  serviceType?: keyof ServiceType;

  login?: string;

  password?: string;

  licenseNumber?: string;

  shipmentNumber?: string;

  invoiceNumber: string;

  referenceNumber: string;

  exportReason?: string;

  exportType?: string;

  termsOfSale: Incoterm;

  items: ItemDto[];

  from: AddressDto;

  to: AddressDto;
}

export class CarrierAuthInfo extends PickType(ShipmentRequest, [
  'login',
  'password',
  'licenseNumber',
  'shipmentNumber',
] as const) {}
