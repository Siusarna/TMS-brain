import { Module } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { defaultConfig } from '../config';
import { SqsModule } from '@ssut/nestjs-sqs';
import { ShipmentModule } from '../shipment/shipment.module';
import { UserAccountsModule } from '../user-accounts/user-accounts.module';
import { HttpModule } from '@nestjs/axios';
import { QueueTrackingService } from './queue-tracking.service';

AWS.config.update({
  region: defaultConfig.sqsRegion,
  accessKeyId: defaultConfig.s3AccessKey,
  secretAccessKey: defaultConfig.s3SecretKey,
});

@Module({
  imports: [
    SqsModule.register({
      consumers: [
        {
          name: defaultConfig.sqsQueueName,
          queueUrl: defaultConfig.sqsQueueUrl,
          region: defaultConfig.sqsRegion,
        },
      ],
    }),
    ShipmentModule,
    UserAccountsModule,
    HttpModule.register({ timeout: defaultConfig.httpTimeout }),
  ],
  providers: [QueueTrackingService],
})
export class QueueTrackingModule {}
