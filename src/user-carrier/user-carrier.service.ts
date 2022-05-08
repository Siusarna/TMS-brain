import { Carriers } from '../constants/carriers.constants';
import { UserCarrier } from './entities/user-carrier.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { AddCarrierDto } from './dtos/add-carrier.dto';
import {
  DhlServiceType,
  UpsServiceType,
} from '../constants/service-type.constants';

@Injectable()
export class UserCarrierService {
  constructor(
    @InjectRepository(UserCarrier)
    private userCarrierRepository: Repository<UserCarrier>,
  ) {}

  addCarrier(userId: number, { carrier }: AddCarrierDto): Promise<UserCarrier> {
    return this.userCarrierRepository.save(
      new UserCarrier({ userId, carrier }),
    );
  }

  async removeCarrier(userId: number, carrier: Carriers): Promise<void> {
    const userCarrier = await this.userCarrierRepository.find({
      userId,
      carrier,
    });
    if (!userCarrier) {
      throw new UnprocessableEntityException(
        'Record for this carrier doesnt found',
      );
    }
    await this.userCarrierRepository.remove(userCarrier);
    return;
  }

  getUserCarriers(userId: number): Promise<UserCarrier[]> {
    return this.userCarrierRepository.find({ userId });
  }

  getServicesByCarrier(carrier: Carriers): string[] {
    switch (carrier) {
      case Carriers.DHL:
        return Object.keys(DhlServiceType);
      case Carriers.UPS:
        return Object.keys(UpsServiceType);
    }
  }
}
