import {
  PipeTransform,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AddAccountDto } from '../user-accounts/dtos/add-account.dto';
import { Carriers } from '../user-accounts/types/carriers.type';

@Injectable()
export class ValidationUserAccountPipe implements PipeTransform {
  transform(value: AddAccountDto) {
    switch (value.carrier) {
      case Carriers.DHL:
        if (!value.login || !value.password) {
          throw new UnprocessableEntityException(
            'Login and password is required for DHL carrier',
          );
        }
        return value;
      case Carriers.UPS:
        if (!value.login || !value.password || !value.licenseNumber) {
          throw new UnprocessableEntityException(
            'Login, password and licenseNumber is required for UPS carrier',
          );
        }
        return value;
      default:
        return value;
    }
  }
}
