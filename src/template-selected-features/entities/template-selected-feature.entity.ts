import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TemplateSelectedFeature {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'int' })
  public template_id: number;

  @Column({ type: 'int' })
  public feature_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
