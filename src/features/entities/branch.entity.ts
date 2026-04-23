import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Country } from './country.entity';
import { Representative } from './representative.entity';
import { BaseModel } from 'src/core/base-model';

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
