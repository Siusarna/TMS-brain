import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config';
import { UserAccountsModule } from './user-accounts/user-accounts.module';
import { CommonModule } from './common/common.module';
import { ShipmentModule } from './shipment/shipment.module';
import { UserCarrierModule } from './user-carrier/user-carrier.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    UserAccountsModule,
    CommonModule,
    ShipmentModule,
    UserCarrierModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
