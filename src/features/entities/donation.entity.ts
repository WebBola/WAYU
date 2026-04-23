import { Entity, Column } from 'typeorm';
import { BaseModel } from 'src/core/base-model';
import { PaymentProvider } from 'src/core/enum/enum';

@Entity('donations')
export class Donation extends BaseModel {
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount!: number;

  @Column({ length: 64 })
  fullName!: string;

  @Column({ type: 'timestamp' })
  date!: Date;

  @Column({ type: 'enum', enum: PaymentProvider })
  paidBy!: PaymentProvider;
}
