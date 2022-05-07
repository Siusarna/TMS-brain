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
} from '@nestjs/common';
import { AddAccountDto } from './dtos/add-account.dto';
import { AuthGuard } from '../guards/auth.guard';
import { UserAccountsService } from './user-accounts.service';
import { ValidationUserAccountPipe } from '../pipes/validation-user-account.pipe';
import { Carriers } from '../constants/carriers.constants';

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
  getAllAccounts(@Request() req) {
    return this.userAccountsService.getAllUserAccounts(req.user.id);
  }
}
