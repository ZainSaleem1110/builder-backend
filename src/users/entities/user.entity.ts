import * as bcrypt from "bcrypt";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: "varchar", length: 120 })
  public name: string;

  @Column({ type: "varchar", length: 120 })
  public email: string;

  @Column({ type: "text", nullable: true })
  public profile_picture: string;

  @Column({ type: "varchar", length: 120 })
  public phone: string;

  @Column({ type: "varchar", length: 120, nullable: true })
  public currency: string;

  @Column({ type: "varchar", length: 120 })
  public register_via: string;

  @Column({ type: "varchar", length: 120, nullable: true })
  public company_size: string;

  @Column({ type: "varchar", length: 120, nullable: true })
  public company_role: string;

  @Column({ type: "varchar", length: 120 })
  public user_role: string;

  @Column({ nullable: true, type: "varchar", length: 120 })
  public extra_id: string;

  @Column({ type: Boolean, default: false })
  public is_verified: boolean;

  @Column({ type: "text", nullable: true })
  public card_details: string;

  @Column({ type: "text", nullable: true, default: null })
  public customer_id: string;

  @Column({ type: "varchar", length: 70, nullable: true })
  password: string;
  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, 6);
  }
  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compareSync(password, this.password);
  }
  constructor(id: string, name: string, pass: string) {
    //this.id = id;
    this.name = name;
    this.password = pass;
  }

  @Column({ type: "boolean", default: false })
  public isDeleted: boolean;

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: "timestamp" })
  public createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  public updatedAt!: Date;
}
