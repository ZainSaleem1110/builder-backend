import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Phase {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: "varchar", length: 120 })
  public name: string;

  @Column({ type: "varchar", length: 120, nullable: true })
  public image: string;

  @CreateDateColumn({ type: "timestamp" })
  public createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  public updatedAt!: Date;
}
