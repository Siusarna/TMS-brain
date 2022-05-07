import { Module } from '@nestjs/common';
import { ShipmentController } from './shipment.controller';
import { UserAccountsModule } from '../user-accounts/user-accounts.module';

@Module({
  controllers: [ShipmentController],
  imports: [UserAccountsModule],
})
export class ShipmentModule {}
