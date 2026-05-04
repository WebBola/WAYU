import { BaseModel } from '@/core/base-model';
import { Entity, Column } from 'typeorm';

@Entity('countries')
export class Country extends BaseModel {
  @Column({ length: 64, unique: true })
  title!: string;

  @Column({ length: 128 })
  flag!: string;
}
