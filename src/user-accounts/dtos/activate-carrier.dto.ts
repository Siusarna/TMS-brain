import { IsEnum } from 'class-validator';
import { Carriers } from '../../constants/carriers.constants';

export class ActivateCarrierDto {
  /**
   * @example DHL
   */
  @IsEnum(Carriers)
  carrier: Carriers;
}
