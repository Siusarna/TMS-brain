import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { randomUUID } from 'crypto';
import { defaultConfig } from '../../config';
import { ManagedUpload } from 'aws-sdk/lib/s3/managed_upload';
import SendData = ManagedUpload.SendData;

@Injectable()
export class AwsS3Service {

  private readonly bucketName = defaultConfig.s3BucketName;

  private readonly s3 = new AWS.S3({
    accessKeyId: defaultConfig.s3AccessKey,
    secretAccessKey: defaultConfig.s3SecretKey,
  });

  async uploadFile(file: Buffer, name: string): Promise<SendData> {
    const params = {
      Bucket: this.bucketName,
      Key: `${randomUUID()}-${name}`,
      Body: file,
      ACL: 'public-read',
    };
    return await this.s3.upload(params).promise();
  }
}
