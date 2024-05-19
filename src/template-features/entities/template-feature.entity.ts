import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
  ManyToMany,
} from "typeorm";
import { Template } from "../../templates/entities/template.entity";
import { Feature } from "../../features/entities/feature.entity";

@Entity()
export class TemplateFeature {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: "int" })
  public template_id: number;

  @Column({ type: "int" })
  public feature_id: number;

  @CreateDateColumn({ type: "timestamp" })
  public createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  public updatedAt!: Date;

  @JoinColumn({ name: "template_id" })
  @ManyToOne((type) => Template, (template) => template.features)
  template: Template;
}
