import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Carriers } from '../types/carriers.type';

@Entity()
@Index(['userId', 'carrier'], { unique: true, where: 'is_deleted = false' })
export class UserAccounts {
  constructor(data?: {
    userId: number;
    login?: string;
    password?: string;
    token?: string;
    licenseNumber?: string;
    carrier: Carriers;
  }) {
    if (data) {
      this.userId = data.userId;
      this.login = data.login;
      this.password = data.password;
      this.token = data.token;
      this.licenceNumber = data.licenseNumber;
      this.carrier = data.carrier;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  carrier: Carriers;

  @Column({ nullable: true })
  login: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  token: string;

  @Column({ nullable: true })
  licenceNumber: string;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
