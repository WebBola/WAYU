import { Entity, Column } from 'typeorm';
import { BaseModel } from '@/core/base-model';

@Entity('tags')
export class Tag extends BaseModel {
  @Column({ length: 64, unique: true })
  title!: string;
}
