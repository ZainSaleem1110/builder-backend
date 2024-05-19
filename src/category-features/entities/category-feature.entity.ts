import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CategoryFeature {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'int' })
  public category_id: number;

  @Column({ type: 'int' })
  public feature_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
