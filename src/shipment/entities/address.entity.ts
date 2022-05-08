import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Address {
  constructor(data?: {
    name: string;
    company?: string;
    address1: string;
    municipality: string;
    stateOrProvince: string;
    country: string;
    postalCode: string;
    email: string;
    phone: string;
  }) {
    if (data) {
      this.name = data.name;
      this.company = data.company;
      this.address1 = data.address1;
      this.municipality = data.municipality;
      this.stateOrProvince = data.stateOrProvince;
      this.country = data.country;
      this.postalCode = data.postalCode;
      this.email = data.email;
      this.phone = data.phone;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  company: string;

  @Column()
  address1: string;

  @Column()
  municipality: string;

  @Column()
  stateOrProvince: string;

  @Column()
  country: string;

  @Column()
  postalCode: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
