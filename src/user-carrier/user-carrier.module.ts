import { Module } from '@nestjs/common';
import { UserCarrierController } from './user-carrier.controller';
import { UserCarrierService } from './user-carrier.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCarrier } from './entities/user-carrier.entity';

@Module({
  controllers: [UserCarrierController],
  providers: [UserCarrierService],
  exports: [UserCarrierService],
  imports: [TypeOrmModule.forFeature([UserCarrier])],
})
export class UserCarrierModule {}
