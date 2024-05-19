import { FeatureImage } from "src/feature-images/entities/feature-image.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

@Entity()
export class Feature {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: "int" })
  public category_id: number;

  @Column({ type: "varchar", length: 120 })
  public name: string;

  @Column({ type: "int" })
  public cost: number;

  @Column({ type: "int" })
  public duration: number;

  @Column({ type: "varchar", length: 100 })
  public duration_type: string;

  @Column({ type: "text", nullable: true })
  public description: string;

  @Column({ type: "text", nullable: true })
  public mobileImage: string;

  @Column({ type: "text", nullable: true })
  public deskImage: string;

  @CreateDateColumn({ type: "timestamp" })
  public createdAt!: Date;

  @Column({ type: "int", nullable: true })
  public customization_cost: number;

  @UpdateDateColumn({ type: "timestamp" })
  public updatedAt!: Date;

  @OneToMany(() => FeatureImage, (image) => image.feature)
  images: FeatureImage[];
}
