import { Column, Entity } from 'typeorm';
import { BaseModel } from '@/core/base-model';

@Entity('news_categories')
export class NewsCategory extends BaseModel {
  @Column({ length: 64, unique: true })
  title!: string;
}
