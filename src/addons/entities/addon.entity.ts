import { AddonFeature } from "src/addon-features/entities/addon-feature.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
//test
@Entity()
export class Addon {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: "varchar", length: 120 })
  public name: string;

  @Column({ type: "varchar", length: 255 })
  public tagline: string;

  @Column({ type: "text", nullable: true })
  public image: string;

  @Column({ type: "int" })
  public duration: number;

  @Column({ type: "varchar", length: 120 })
  public duration_type: string;

  @Column({ type: "int" })
  public cost: number;

  @Column({ type: "boolean", default: false })
  public number_of_users: number;

  @CreateDateColumn({ type: "timestamp" })
  public createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  public updatedAt!: Date;

  @OneToMany(() => AddonFeature, (feature) => feature.addon)
  features: AddonFeature[];
}
