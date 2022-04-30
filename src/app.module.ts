import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config';
import { UserAccountsModule } from './user-accounts/user-accounts.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), UserAccountsModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
