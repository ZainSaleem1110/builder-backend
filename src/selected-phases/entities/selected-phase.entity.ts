import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class SelectedPhase {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'int' })
  public order_requirement_id: number;

  @Column({ type: 'int' })
  public phase_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
