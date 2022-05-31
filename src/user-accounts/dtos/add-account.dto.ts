import { IsEnum, IsString, IsUrl, ValidateIf } from 'class-validator';
import { Carriers } from '../../constants/carriers.constants';

export class AddAccountDto {
  /**
   * @example dhl-login
   */
  @IsString()
  @ValidateIf((object, value) => value !== undefined)
  login?: string;

  /**
   * @example dhl-password
   */
  @IsString()
  @ValidateIf((object, value) => value !== undefined)
  password?: string;

  /**
   * @example dhl-uniq-token
   */
  @IsString()
  @ValidateIf((object, value) => value !== undefined)
  token?: string;

  /**
   * @example N213876213677
   */
  @IsString()
  @ValidateIf((object, value) => value !== undefined)
  licenseNumber?: string;

  /**
   * @example 3204898434
   */
  @IsString()
  @ValidateIf((object, value) => value !== undefined)
  shipmentNumber?: string;

  /**
   * @example DHL
   */
  @IsEnum(Carriers)
  carrier: Carriers;

  /**
   * @example https://my-domain.com/url-for-webhook
   */
  @IsUrl({
    require_valid_protocol: true,
    require_tld: false,
  })
  @ValidateIf((object, value) => value !== undefined)
  webHookUrl: string;
}
