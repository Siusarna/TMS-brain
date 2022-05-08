import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DimensionUnits, WeightUnits } from '../types/units.type';
import { Shipment } from './shipment.entity';

@Entity()
export class Item {
  constructor(data?: {
    shipmentId: number;
    htsCode: string;
    htsDescription: string;
    cost: number;
    countryOfManufacture: string;
    weight: number;
    width: number;
    height: number;
    length: number;
    weightUnits: WeightUnits;
    dimensionUnits: DimensionUnits;
  }) {
    if (data) {
      this.shipment = data.shipmentId;
      this.htsCode = data.htsCode;
      this.htsDescription = data.htsDescription;
      this.cost = data.cost;
      this.countryOfManufacture = data.countryOfManufacture;
      this.weight = data.weight;
      this.width = data.width;
      this.height = data.height;
      this.length = data.length;
      this.weightUnits = data.weightUnits;
      this.dimensionUnits = data.dimensionUnits;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Shipment)
  @JoinColumn({ name: 'shipment_id' })
  shipment: number;

  @Column()
  htsCode: string;

  @Column()
  htsDescription: string;

  @Column()
  cost: number;

  @Column()
  countryOfManufacture: string;

  @Column()
  weight: number;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column()
  length: number;

  @Column()
  weightUnits: WeightUnits;

  @Column()
  dimensionUnits: DimensionUnits;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
