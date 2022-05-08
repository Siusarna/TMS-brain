import { Module } from '@nestjs/common';
import { ShipmentController } from './shipment.controller';
import { UserAccountsModule } from '../user-accounts/user-accounts.module';
import { ShipmentService } from './shipment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipment } from './entities/shipment.entity';
import { Address } from './entities/address.entity';
import { Item } from './entities/item.entity';
import { Document } from './entities/document.entity';

@Module({
  controllers: [ShipmentController],
  providers: [ShipmentService],
  imports: [
    UserAccountsModule,
    TypeOrmModule.forFeature([Shipment, Address, Item, Document]),
  ],
})
export class ShipmentModule {}
