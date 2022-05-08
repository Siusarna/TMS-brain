import { Module } from '@nestjs/common';
import { ShipmentController } from './shipment.controller';
import { UserAccountsModule } from '../user-accounts/user-accounts.module';
import { ShipmentService } from './shipment.service';

@Module({
  controllers: [ShipmentController],
  providers: [ShipmentService],
  imports: [UserAccountsModule],
})
export class ShipmentModule {}
