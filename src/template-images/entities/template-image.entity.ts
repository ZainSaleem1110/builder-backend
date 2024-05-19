import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TemplateImage {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'int' })
  public template_id: number;

  @Column({ type: 'boolean' })
  public is_mobile: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public name: string;

  @Column({ type: 'text', nullable: true })
  public url: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
