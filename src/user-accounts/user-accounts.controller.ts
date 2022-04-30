import {
  Controller,
  Post,
  UseGuards,
  Version,
  Request,
  Body,
} from '@nestjs/common';
import { AddAccountDto } from './dtos/add-account.dto';
import { AuthGuard } from '../guards/auth.guard';
import { UserAccountsService } from './user-accounts.service';
import { ValidationUserAccountPipe } from '../pipes/validation-user-account.pipe';

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
}
