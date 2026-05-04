import { BaseModel } from '@/core/base-model';
import { Entity, Column } from 'typeorm';

@Entity('authors')
export class Author extends BaseModel {
  @Column({ length: 64 })
  fullName!: string;
}
