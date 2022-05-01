import { Module } from '@nestjs/common';
import { UserAccountsController } from './user-accounts.controller';
import { UserAccounts } from './entities/user-accounts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccountsService } from './user-accounts.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserAccounts])],
  providers: [UserAccountsService],
  controllers: [UserAccountsController],
})
export class UserAccountsModule {}
