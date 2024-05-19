import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { TemplateFeature } from "../../template-features/entities/template-feature.entity";

@Entity()
export class Template {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: "int" })
  public vertical_id: number;
  @Column({ type: 'int',nullable: true })
  public phases_id: number;

  @Column({ type: 'int',nullable: true })
  public addons_id: number;
  
  @Column({ type: 'int',nullable: true })
  public platforms_id: number;

  @Column({ type: "int", nullable: true })
  public price: number;

  @Column({ type: "varchar", length: 120 })
  public name: string;

  @Column({ type: "text", nullable: true })
  public description: string;

  @Column({ type: "text", nullable: true })
  public images: string;
  @Column({ type: 'varchar', length: 255, nullable: true })
  public logo: string;

  @CreateDateColumn({ type: "timestamp" })
  public createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  public updatedAt!: Date;

  @OneToMany(() => TemplateFeature, (feature) => feature.template, {
    cascade: true,
  })
  features: TemplateFeature[];
}
