import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { defaultConfig } from '../config';
import { AuthRequestsService } from './requests/auth-requests.service';
import { ServiceRequestsFactory } from './requests/carriers/service-requests.factory';

@Global()
@Module({
  imports: [HttpModule.register({ timeout: defaultConfig.httpTimeout })],
  providers: [AuthRequestsService, ServiceRequestsFactory],
  exports: [AuthRequestsService, ServiceRequestsFactory],
})
export class CommonModule {}
