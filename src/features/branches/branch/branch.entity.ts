import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Country } from '@/features/branches/country/country.entity';
import { Representative } from '@/features/branches/representative/representative.entity';
import { BaseModel } from '@/core/base-model';

@Entity('branches')
export class Branch extends BaseModel {
  @Column()
  countryId!: number;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'countryId' })
  country!: Country;

  @Column()
  representativeId!: number;

  @ManyToOne(() => Representative)
  @JoinColumn({ name: 'representativeId' })
  representative!: Representative;

  @Column({ length: 64 })
  city!: string;

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  latitude!: number;

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  longitude!: number;

  @Column({ length: 16 })
  phoneNumber!: string;
}
