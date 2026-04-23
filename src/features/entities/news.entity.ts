import { Entity, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { NewsCategory } from './news-category.entity';
import { Country } from './country.entity';
import { Tag } from './tag.entity';
import { BaseModel } from 'src/core/base-model';

@Entity('news')
export class News extends BaseModel {
  @Column()
  categoryId!: number;

  @ManyToOne(() => NewsCategory)
  @JoinColumn({ name: 'categoryId' })
  category!: NewsCategory;

  @Column({ nullable: true })
  countryId!: number | null;

  @ManyToOne(() => Country, { nullable: true })
  @JoinColumn({ name: 'countryId' })
  country!: Country | null;

  @Column({ length: 256 })
  title!: string;

  @Column({ length: 128 })
  image!: string;

  @Column({ type: 'date' })
  date!: string;

  @Column({ type: 'text' })
  content!: string;

  @ManyToMany(() => Tag)
  @JoinTable({
    name: 'news_tags',
    joinColumn: { name: 'newsId' },
    inverseJoinColumn: { name: 'tagId' },
  })
  tags!: Tag[];
}
