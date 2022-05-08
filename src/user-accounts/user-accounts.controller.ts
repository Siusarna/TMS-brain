import {
  Controller,
  Post,
  UseGuards,
  Version,
  Request,
  Body,
  Patch,
  Delete,
  Query,
  HttpCode,
  Get,
  ValidationPipe,
} from '@nestjs/common';
import { AddAccountDto } from './dtos/add-account.dto';
import { AuthGuard } from '../guards/auth.guard';
import { UserAccountsService } from './user-accounts.service';
import { ValidationUserAccountPipe } from '../pipes/validation-user-account.pipe';
import { Carriers } from '../constants/carriers.constants';
import { CarrierDto } from './dtos/carrier.dto';
import { AddCarrierDto } from './dtos/add-carrier.dto';
import { GetActivatedAccountsDto } from './dtos/get-activated-accounts-dto';

@Controller('user-accounts')
export class UserAccountsController {
  constructor(private userAccountsService: UserAccountsService) {}

  @Version('1')
  @Post()
  @UseGuards(AuthGuard)
  addAccount(
    @Request() req,
    @Body(ValidationUserAccountPipe) data: AddAccountDto,
  ) {
    return this.userAccountsService.addUserAccount(req.user.id, data);
  }

  @Version('1')
  @Patch()
  @UseGuards(AuthGuard)
  updateAccount(
    @Request() req,
    @Body(ValidationUserAccountPipe) data: AddAccountDto,
  ) {
    return this.userAccountsService.updateUserAccount(req.user.id, data);
  }

  @Version('1')
  @Delete()
  @UseGuards(AuthGuard)
  @HttpCode(204)
  deleteAccount(@Request() req, @Query('carrier') carrier: Carriers) {
    return this.userAccountsService.deleteUserAccount(req.user.id, carrier);
  }

  @Version('1')
  @Get()
  @UseGuards(AuthGuard)
  getAccounts(
    @Request() req,
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    data: GetActivatedAccountsDto,
  ) {
    return this.userAccountsService.getUserAccounts(req.user.id, data);
  }

  @Version('1')
  @Post('activate')
  @UseGuards(AuthGuard)
  activateAccount(@Request() req, @Body() data: AddCarrierDto) {
    return this.userAccountsService.activateAccount(req.user.id, data.carrier);
  }

  @Version('1')
  @Delete('activate')
  @UseGuards(AuthGuard)
  deactivateAccount(
    @Request() req,
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    data: CarrierDto,
  ) {
    return this.userAccountsService.deactivateAccount(
      req.user.id,
      data.carrier,
    );
  }

  @Version('1')
  @Get('services')
  @UseGuards(AuthGuard)
  getServicesByCarrier(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    data: CarrierDto,
  ) {
    return this.userAccountsService.getServicesByCarrier(data.carrier);
  }
}
