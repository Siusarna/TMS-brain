import { IsEnum, IsString, ValidateIf } from 'class-validator';
import { Carriers } from '../types/carriers.type';

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

  @IsEnum(Carriers)
  carrier: Carriers;
}
