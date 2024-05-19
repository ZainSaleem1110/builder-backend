import { Feature } from "src/features/entities/feature.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";

@Entity()
export class FeatureImage {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: "int" })
  public feature_id: number;

  @Column({ type: "boolean" })
  public is_mobile: boolean;

  @Column({ type: "varchar", length: 255, nullable: true })
  public name: string;

  @Column({ type: "text", nullable: true })
  public url: string;

  @CreateDateColumn({ type: "timestamp" })
  public createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  public updatedAt!: Date;

  @JoinColumn({ name: "feature_id" })
  @ManyToOne((type) => Feature, (feature) => feature.images)
  feature: Feature;
}
