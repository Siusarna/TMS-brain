import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Shipment } from './shipment.entity';

@Entity()
export class Document {
  constructor(data?: { shipmentId: number; documentUrl: string }) {
    if (data) {
      this.shipment = data.shipmentId;
      this.documentUrl = data.documentUrl;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Shipment)
  @JoinColumn({ name: 'shipment_id' })
  shipment: number;

  @Column()
  documentUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
