import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Carriers } from '../../constants/carriers.constants';

@Entity()
@Index(['userId', 'carrier'], { unique: true, where: 'is_deleted = false' })
export class UserAccounts {
  constructor(data?: {
    userId: number;
    login?: string;
    password?: string;
    token?: string;
    licenseNumber?: string;
    webHookUrl?: string;
    carrier: Carriers;
    shipmentNumber?: string
  }) {
    if (data) {
      this.userId = data.userId;
      this.login = data.login;
      this.password = data.password;
      this.token = data.token;
      this.licenceNumber = data.licenseNumber;
      this.webHookUrl = data.webHookUrl;
      this.carrier = data.carrier;
      this.shipmentNumber = data.shipmentNumber
    }
  }

  /**
   * @example 1
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * @example 1
   */
  @Column()
  userId: number;

  /**
   * @example DHL
   */
  @Column()
  carrier: Carriers;

  /**
   * @example dhl-login
   */
  @Column({ nullable: true })
  login: string;

  /**
   * @example dhl-password
   */
  @Column({ nullable: true })
  password: string;

  /**
   * @example dhl-uniq-token
   */
  @Column({ nullable: true })
  token: string;

  /**
   * @example N213876213677
   */
  @Column({ nullable: true })
  licenceNumber: string;

  /**
   * @example 3204898434
   */
  @Column({ nullable: true })
  shipmentNumber: string;

  /**
   * @example https://my-domain.com/url-for-webhook
   */
  @Column({ nullable: true })
  webHookUrl: string;

  /**
   * @example false
   */
  @Column({ default: false })
  isActivated: boolean;

  /**
   * @example false
   */
  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
