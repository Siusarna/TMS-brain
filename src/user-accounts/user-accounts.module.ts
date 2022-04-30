import { Module } from '@nestjs/common';
import { UserAccountsController } from './user-accounts.controller';
import { UserAccounts } from './entities/user-accounts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { defaultConfig } from '../config';
import { UserAccountsService } from './user-accounts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAccounts]),
    HttpModule.register({ timeout: defaultConfig.httpTimeout }),
  ],
  providers: [UserAccountsService],
  controllers: [UserAccountsController],
})
export class UserAccountsModule {}
