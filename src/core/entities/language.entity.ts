import { Entity, Column } from 'typeorm';
import { BaseModel } from 'src/core/base-model';
@Entity('languages')
export class Language extends BaseModel {
  @Column({ length: 64 })
  title!: string;
}
