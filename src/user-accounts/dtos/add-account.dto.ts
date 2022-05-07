import { IsEnum, IsString, IsUrl, ValidateIf } from 'class-validator';
import { Carriers } from '../../constants/carriers.constants';

export class AddAccountDto {
  @IsString()
  @ValidateIf((object, value) => value !== undefined)
  login?: string;

  @IsString()
  @ValidateIf((object, value) => value !== undefined)
  password?: string;

  @IsString()
  @ValidateIf((object, value) => value !== undefined)
  token?: string;

  @IsString()
  @ValidateIf((object, value) => value !== undefined)
  licenseNumber?: string;

  @IsString()
  @ValidateIf((object, value) => value !== undefined)
  shipmentNumber?: string;

  @IsEnum(Carriers)
  carrier: Carriers;

  @IsUrl({
    require_valid_protocol: true,
    require_tld: false,
  })
  @ValidateIf((object, value) => value !== undefined)
  webHookUrl: string;
}
