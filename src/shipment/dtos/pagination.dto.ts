import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationDto {
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  limit: number;

  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  skip: number;
}
