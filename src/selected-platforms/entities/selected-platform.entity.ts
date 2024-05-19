import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class SelectedPlatform {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'int' })
  public order_requirement_id: number;

  @Column({ type: 'int' })
  public platform_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
