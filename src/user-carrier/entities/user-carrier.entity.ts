import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Carriers } from '../../constants/carriers.constants';

@Entity()
export class UserCarrier {
  constructor(data?: { userId: number; carrier: Carriers }) {
    if (data) {
      this.userId = data.userId;
      this.carrier = data.carrier;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  carrier: Carriers;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
