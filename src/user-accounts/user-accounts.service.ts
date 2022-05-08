import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserAccounts } from './entities/user-accounts.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { AddAccountDto } from './dtos/add-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Carriers } from '../constants/carriers.constants';

@Injectable()
export class UserAccountsService {
  constructor(
    @InjectRepository(UserAccounts)
    private usersAccountsRepository: Repository<UserAccounts>,
  ) {}

  async findUserAccount(
    userId: number,
    carrier: Carriers,
  ): Promise<UserAccounts> {
    const userAccounts = await this.usersAccountsRepository.findOne({
      userId,
      carrier,
      isDeleted: false,
    });
    if (!userAccounts) {
      throw new NotFoundException(
        `This user doesn't have account for ${carrier} carrier`,
      );
    }
    return userAccounts;
  }

  async addUserAccount(
    userId: number,
    account: AddAccountDto,
  ): Promise<UserAccounts> {
    const userAccount = new UserAccounts({
      userId,
      ...account,
    });
    try {
      return await this.usersAccountsRepository.save(userAccount);
    } catch (e: unknown) {
      if (e instanceof QueryFailedError) {
        throw new UnprocessableEntityException(
          `This user already has account for ${account.carrier} carrier`,
        );
      }
      throw e;
    }
  }

  async updateUserAccount(
    userId: number,
    { carrier, ...credential }: AddAccountDto,
  ): Promise<UserAccounts> {
    const userAccounts = await this.findUserAccount(userId, carrier);
    return this.usersAccountsRepository.save({
      ...userAccounts,
      ...credential,
    });
  }

  async deleteUserAccount(userId: number, carrier: Carriers): Promise<void> {
    const userAccounts = await this.findUserAccount(userId, carrier);
    await this.usersAccountsRepository.save({
      ...userAccounts,
      isDeleted: true,
    });
    return;
  }

  getAllUserAccounts(userId: number): Promise<UserAccounts[]> {
    return this.usersAccountsRepository.find({ userId, isDeleted: false });
  }
}
