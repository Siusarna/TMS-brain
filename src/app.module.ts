import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config';
import { UserSettingsModule } from './user-settings/user-settings.module';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), UserSettingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
