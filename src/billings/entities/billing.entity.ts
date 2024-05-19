import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Billing {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'int' })
  public order_id: number;

  @Column({ type: 'varchar', length: 120 })
  public type: string;

  @Column({ type: 'varchar', length: 120 })
  public first_name: string;

  @Column({ type: 'varchar', length: 120 })
  public last_name: string;

  @Column({ type: 'varchar', length: 120 })
  public phone: string;

  @Column({ type: 'varchar', length: 120 })
  public email: string;

  @Column({ type: 'int' })
  public apartment_number: number;

  @Column({ type: 'varchar', length: 120 })
  public address: string;

  @Column({ type: 'varchar', length: 120 })
  public city: string;

  @Column({ type: 'varchar', length: 120 })
  public country: string;

  @Column({ type: 'varchar', length: 120 })
  public state: string;

  @Column({ type: 'varchar', length: 120 })
  public zipcode: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
