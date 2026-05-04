import { Entity, Column } from 'typeorm';
import { BaseModel } from 'src/core/base-model';
@Entity('expenses')
export class Expense extends BaseModel {
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount!: number;

  @Column({ type: 'timestamp' })
  date!: Date;

  @Column({ length: 256 })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ length: 64, unique: true })
  transactionId!: string;
}
