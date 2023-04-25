import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Carriers } from '../../constants/carriers.constants';
import { Address } from './address.entity';
import { Item } from './item.entity';
import { ServiceType } from '../../constants/service-type.constants';
import { Document } from './document.entity';
import { ShipmentStatus } from '../../constants/shipment-status.constants';
import { UserAccounts } from '../../user-accounts/entities/user-accounts.entity';

@Entity()
export class Shipment {
  constructor(data?: {
    from: Address;
    to: Address;
    userAccount: UserAccounts
    carrierResponse: object;
    trackingNumber: string;
    serviceType: ServiceType;
    carrier: Carriers;
  }) {
    if (data) {
      this.from = data.from;
      this.to = data.to;
      this.carrierResponse = JSON.stringify(data.carrierResponse);
      this.trackingNumber = data.trackingNumber;
      this.serviceType = data.serviceType;
      this.carrier = data.carrier;
      this.userAccount = data.userAccount;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  carrier: Carriers;

  @ManyToOne(() => Address)
  from: Address;

  @ManyToOne(() => Address)
  to: Address;

  @OneToMany(() => Item, (item) => item.shipment)
  items: Item[];

  @Column({ type: 'jsonb' })
  carrierResponse: string;

  @Column()
  trackingNumber: string;

  @Column()
  serviceType: string;

  @OneToMany(() => Document, (document) => document.shipment)
  documents: Document[];

  @ManyToOne(() => UserAccounts)
  userAccount: UserAccounts;

  @Column({ default: ShipmentStatus.MANIFEST })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
