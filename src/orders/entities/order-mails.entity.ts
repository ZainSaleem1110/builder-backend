import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class OrderMails {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: "int" })
  public user_id: number;

  @Column({ type: "int" })
  public order_id: number;

  @Column({ type: "int" })
  public code: number;

  @CreateDateColumn({ type: "timestamp" })
  public createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  public updatedAt!: Date;
}
