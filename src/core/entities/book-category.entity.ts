import { BaseModel } from 'src/core/base-model';
import { Entity, Column } from 'typeorm';

@Entity('book_categories')
export class BookCategory extends BaseModel {
  @Column({ length: 64, unique: true })
  title!: string;
}
