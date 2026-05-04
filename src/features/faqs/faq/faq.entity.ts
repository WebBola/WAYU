import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Tag } from '@/features/faqs/tag/tag.entity';
import { BaseModel } from '@/core/base-model';

@Entity('faqs')
export class Faq extends BaseModel {
  @Column({ length: 256 })
  question!: string;

  @Column({ length: 512 })
  answer!: string;

  @ManyToMany(() => Tag)
  @JoinTable({
    name: 'faqs_tags',
    joinColumn: { name: 'faqsId' },
    inverseJoinColumn: { name: 'tagId' },
  })
  tags!: Tag[];
}
