import { Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';
import { defaultConfig } from '../config';
import { TrackingMessageBodyType } from './types/tracking-message-body.type';
import { ShipmentService } from '../shipment/shipment.service';
import { CARRIER_UPDATE_MAP } from '../constants/tracking-updates-map.constants';
import { UserAccountsService } from '../user-accounts/user-accounts.service';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class QueueTrackingService {
  constructor(
    private shipmentService: ShipmentService,
    private userAccountsService: UserAccountsService,
    private httpService: HttpService,
  ) {}

  @SqsMessageHandler(defaultConfig.sqsQueueName,false)
  async handleTrackingMessage(message: AWS.SQS.Message) {
    const data = JSON.parse(message.Body) as TrackingMessageBodyType;
    const shipment = await this.shipmentService.getShipmentByTrackingNumber(
      data.trackingNumber,
    );
    const normalizedStatus = CARRIER_UPDATE_MAP[data.events[0].status];
    if (shipment.status === normalizedStatus) return;

    const updatedShipment = this.shipmentService.updateShipment(shipment, {
      status: normalizedStatus,
    });

    const userAccount = await this.userAccountsService.findUserAccount(
      shipment.userId,
      shipment.carrier,
    );
    if (userAccount.webHookUrl) {
      await this.httpService.post(userAccount.webHookUrl, {
        trackingData: data,
        shipment: updatedShipment,
      });
    }
  }
}
