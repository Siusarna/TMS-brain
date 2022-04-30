import { Injectable } from '@nestjs/common';
import { UserAccounts } from './entities/user-accounts.entity';
import { Repository } from 'typeorm';
import { AddAccountDto } from './dtos/add-account.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserAccountsService {
  constructor(
    @InjectRepository(UserAccounts)
    private usersAccountsRepository: Repository<UserAccounts>,
  ) {}

  addUserAccount(userId: number, account: AddAccountDto) {
    const userAccount = new UserAccounts({
      userId,
      ...account,
    });
    return this.usersAccountsRepository.save(userAccount);
  }
}
