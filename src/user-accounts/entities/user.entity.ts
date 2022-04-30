import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  constructor(data?: {
    email: string;
    password: string;
    passwordVersion: string;
    iv: string;
  }) {
    if (data) {
      this.email = data.email;
      this.password = data.password;
      this.passwordVersion = data.passwordVersion;
      this.iv = data.iv;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Index({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  passwordVersion: string;

  @Column()
  iv: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
