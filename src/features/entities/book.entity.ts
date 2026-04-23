import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Author } from './author.entity';
import { BookCategory } from './book-category.entity';
import { BaseModel } from 'src/core/base-model';

@Entity('books')
export class Book extends BaseModel {
  @Column()
  authorId!: number;

  @ManyToOne(() => Author)
  @JoinColumn({ name: 'authorId' })
  author!: Author;

  @Column()
  categoryId!: number;

  @ManyToOne(() => BookCategory)
  @JoinColumn({ name: 'categoryId' })
  category!: BookCategory;

  @Column({ length: 256 })
  title!: string;

  @Column({ length: 128 })
  image!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ length: 256 })
  file!: string;

  @Column({ type: 'int' })
  pages!: number;

  @Column({ type: 'int' })
  year!: number;
}
