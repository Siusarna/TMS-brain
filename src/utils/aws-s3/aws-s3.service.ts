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
    region: defaultConfig.s3Region
  });

  async uploadFile(base64File: string, name: string): Promise<SendData> {
    const base64Data = Buffer.from(
      base64File.replace(/^ ?data:image\/\w+;base64,/, ''),
      'base64',
    );
    const params = {
      Bucket: this.bucketName,
      Key: `${randomUUID()}-${name}`,
      Body: base64Data,
      ACL: 'public-read',
      ContentType: 'image/jpeg',
      ContentEncoding: 'base64',
    };
    return await this.s3.upload(params).promise();
  }
}
