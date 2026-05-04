import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { EventCategory } from './event-category.entity';
import { BaseModel } from 'src/core/base-model';

@Entity('events')
export class Event extends BaseModel {
  @Column()
  categoryId!: number;

  @ManyToOne(() => EventCategory)
  @JoinColumn({ name: 'categoryId' })
  category!: EventCategory;

  @Column({ length: 256 })
  title!: string;

  @Column({ type: 'text' })
  content!: string;

  @Column({ length: 128 })
  image!: string;

  @Column({ type: 'timestamp' })
  date!: Date;

  @Column({ length: 128 })
  address!: string;
}
