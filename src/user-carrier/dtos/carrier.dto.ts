import { IsIn } from 'class-validator';
import { Carriers } from '../../constants/carriers.constants';

export class CarrierDto {
  @IsIn(Object.keys(Carriers))
  carrier: Carriers;
}
