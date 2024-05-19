import { User } from '../../users/entities/user.entity';;
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CodeVerification {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  code: string;
  @Column({ nullable: false })
  userId: number;
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
