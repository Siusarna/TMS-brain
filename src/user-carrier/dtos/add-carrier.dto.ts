import { IsEnum } from 'class-validator';
import { Carriers } from '../../constants/carriers.constants';

export class AddCarrierDto {
  @IsEnum(Carriers)
  carrier: Carriers;
}
