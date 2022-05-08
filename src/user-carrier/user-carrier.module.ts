import { Module } from '@nestjs/common';
import { UserCarrierController } from './user-carrier.controller';
import { UserCarrierService } from './user-carrier.service';

@Module({
  controllers: [UserCarrierController],
  providers: [UserCarrierService],
  exports: [UserCarrierService],
})
export class UserCarrierModule {}
