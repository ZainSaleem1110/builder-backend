import { Addon } from "src/addons/entities/addon.entity";
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
export class AddonFeature {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: "int" })
  public addon_id: number;

  @Column({ type: "varchar", length: 255 })
  public name: string;

  @CreateDateColumn({ type: "timestamp" })
  public createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  public updatedAt!: Date;

  @JoinColumn({ name: "addon_id" })
  @ManyToOne((type) => Addon, (addon) => addon.features)
  addon: Addon;
}
