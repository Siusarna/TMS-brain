import {
  IsArray,
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsObject, IsOptional,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
  MaxLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DimensionUnits, WeightUnits } from '../types/units.type';
import { ExportReasonType, Incoterm } from '../types/request.type';
import { Carriers } from '../../constants/carriers.constants';
import { Services, ServiceType } from '../../constants/service-type.constants';

export class ItemDto {
  @IsString()
  @IsNotEmpty()
  htsCode: string;

  @IsString()
  @IsNotEmpty()
  htsDescription: string;

  @IsNumber()
  cost: number;

  @IsString()
  @IsNotEmpty()
  countryOfManufacture: string;

  // Real world stuff
  @IsNumber()
  weight: number;

  @IsNumber()
  width: number;

  @IsNumber()
  height: number;

  @IsNumber()
  length: number;

  @IsEnum(WeightUnits)
  weightUnits: WeightUnits;

  @IsEnum(DimensionUnits)
  dimensionUnits: DimensionUnits;
}

export class AddressDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsNotEmpty()
  address1: string;

  @IsString()
  @IsNotEmpty()
  municipality: string;

  @IsString()
  @IsNotEmpty()
  stateOrProvince: string;

  @IsString()
  @MaxLength(2)
  country: string;

  @IsPostalCode('any')
  postalCode: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone: string;
}

export class CreateShipmentDto {
  @IsEnum(Carriers)
  @ValidateIf((object, value) => value !== undefined)
  carrier?: Carriers;

  @IsIn(Object.keys(Services))
  @ValidateIf((object, value) => value !== undefined)
  serviceType?: keyof ServiceType;

  @IsString()
  @IsNotEmpty()
  invoiceNumber: string;

  @IsString()
  @IsNotEmpty()
  referenceNumber: string;

  @IsString()
  @IsOptional()
  exportReason?: string;

  @IsEnum(ExportReasonType)
  @IsOptional()
  exportType?: string;

  @IsEnum(Incoterm)
  termsOfSale: Incoterm;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: ItemDto[];

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  from: AddressDto;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  to: AddressDto;
}
