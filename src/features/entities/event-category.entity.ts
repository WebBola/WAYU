import { Entity, Column } from 'typeorm';
import { BaseModel } from 'src/core/base-model';
@Entity('event_categories')
export class EventCategory extends BaseModel {
  @Column({ length: 64, unique: true })
  title!: string;
}
