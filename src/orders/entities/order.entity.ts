import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: "int" })
  public user_id: number;

  @Column({ type: "varchar", length: 120 })
  public status: string;

  @Column({ type: "text" })
  public description: string;

  @Column({ type: "varchar", length: 120, nullable: true })
  public payment_via: string;

  @Column({ type: "varchar", length: 120, nullable: true })
  public payment_status: string;

  @Column({ type: "int", nullable: true })
  public total_installments: number;

  @Column({ type: "varchar", length: 120, nullable: true })
  public installment_duration_type: string;

  @Column({ type: "varchar", nullable: true })
  public total_amount: string;

  @Column({ type: "varchar", nullable: true })
  public first_deposit: string;

  @Column({ type: "varchar", nullable: true })
  public total_duration: string;

  @Column({ type: "varchar", nullable: true })
  public duration_type: string;

  @Column({ type: "int", nullable: true })
  public order_step: number;

  @Column({ type: "text", nullable: true })
  public order_object: string;

  @CreateDateColumn({ type: "timestamp" })
  public createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  public updatedAt!: Date;
}
