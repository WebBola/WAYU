import { Entity, Column } from 'typeorm';
import { BaseModel } from '@/core/base-model';

@Entity('event_categories')
export class EventCategory extends BaseModel {
  @Column({ length: 64, unique: true })
  title!: string;
}
