import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { defaultConfig } from '../config';
import { AuthRequestsService } from './requests/auth-requests.service';

@Global()
@Module({
  imports: [HttpModule.register({ timeout: defaultConfig.httpTimeout })],
  providers: [AuthRequestsService],
  exports: [AuthRequestsService],
})
export class CommonModule {}
