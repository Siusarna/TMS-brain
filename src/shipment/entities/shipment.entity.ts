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

@Entity()
export class Shipment {
  constructor(data?: {
    userId: number;
    from: Address;
    to: Address;
    carrierResponse: object;
    trackingNumber: string;
    serviceType: ServiceType;
    carrier: Carriers;
  }) {
    if (data) {
      this.userId = data.userId;
      this.from = data.from;
      this.to = data.to;
      this.carrierResponse = JSON.stringify(data.carrierResponse);
      this.trackingNumber = data.trackingNumber;
      this.serviceType = data.serviceType;
      this.carrier = data.carrier;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

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
  serviceType: ServiceType;

  @OneToMany(() => Document, (document) => document.shipment)
  documents: Document[];

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
