import { Column, Entity, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import type { Relation } from "typeorm";
import { BaseModel } from '@/core/base-model';
import { NewsCategory } from "@/features/news/news-category/news-category.entity";
import { Country } from "@/features/countries/country/country.entity";
import { Tag } from "@/features/faqs/tag/tag.entity";

@Entity('news')
export class News extends BaseModel {
    @Column()
    categoryId!: number;

    @ManyToOne(() => NewsCategory, newsCategory => newsCategory.news, { onDelete: "RESTRICT" })
    category?: Relation<NewsCategory>;

    @Column({ nullable: true })
    countryId?: number;

    @ManyToOne(() => Country, { nullable: true })
    country?: Relation<Country>;

    @Column({ length: 256 })
    title!: string;

    @Column({ length: 256 })
    image!: string;

    @Column({ type: 'date' })
    date!: Date;

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