import { IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetActivatedAccountsDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === true || value === false) return value;
    if (value === 'true') return true;
    if (value === 'false') return false;
  })
  isActivated: boolean;
}
