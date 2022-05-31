import {
  IsArray,
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
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
  /**
   * @example 9506.62.4040
   */
  @IsString()
  @IsNotEmpty()
  htsCode: string;

  /**
   * @example sneakers
   */
  @IsString()
  @IsNotEmpty()
  htsDescription: string;

  /**
   * @example 210
   */
  @IsNumber()
  cost: number;

  /**
   * @example USA
   */
  @IsString()
  @IsNotEmpty()
  countryOfManufacture: string;

  /**
   * @example 2
   */
  // Real world stuff
  @IsNumber()
  weight: number;

  /**
   * @example 40
   */
  @IsNumber()
  width: number;

  /**
   * @example 30
   */
  @IsNumber()
  height: number;

  /**
   * @example 40
   */
  @IsNumber()
  length: number;

  /**
   * @example KGS
   */
  @IsEnum(WeightUnits)
  weightUnits: WeightUnits;

  /**
   * @example CM
   */
  @IsEnum(DimensionUnits)
  dimensionUnits: DimensionUnits;
}

export class AddressDto {
  /**
   * @example "Dmytro Petruniak"
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * @example KPI
   */
  @IsString()
  @IsNotEmpty()
  company: string;

  /**
   * @example "Akademika Yangela street, 20"
   */
  @IsString()
  @IsNotEmpty()
  address1: string;

  /**
   * @example Kyiv
   */
  @IsString()
  @IsNotEmpty()
  municipality: string;

  /**
   * @example Kyiv
   */
  @IsString()
  @IsNotEmpty()
  stateOrProvince: string;

  /**
   * @example UA
   */
  @IsString()
  @MaxLength(2)
  country: string;

  /**
   * @example 03056
   */
  @IsPostalCode('any')
  postalCode: string;

  /**
   * @example charodeyrap@gmail.com
   */
  @IsEmail()
  email: string;

  /**
   * @example +380863464123
   */
  @IsPhoneNumber()
  phone: string;
}

export class CreateShipmentDto {
  /**
   * @example DHL
   */
  @IsEnum(Carriers)
  @ValidateIf((object, value) => value !== undefined)
  carrier?: Carriers;

  @IsIn(Object.keys(Services))
  @ValidateIf((object, value) => value !== undefined)
  serviceType?: keyof ServiceType;

  /**
   * @example N245345435
   */
  @IsString()
  @IsNotEmpty()
  invoiceNumber: string;

  /**
   * @example R24982
   */
  @IsString()
  @IsNotEmpty()
  referenceNumber: string;

  /**
   * @example SELL
   */
  @IsString()
  @IsOptional()
  exportReason?: string;

  /**
   * @example gift
   */
  @IsEnum(ExportReasonType)
  @IsOptional()
  exportType?: string;

  /**
   * @example EXW
   */
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
