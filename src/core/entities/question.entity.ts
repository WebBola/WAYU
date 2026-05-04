import { Entity, Column } from 'typeorm';
import { BaseModel } from 'src/core/base-model';
import { QuestionStatus } from 'src/core/enum/enum';

@Entity('questions')
export class Question extends BaseModel {
  @Column({ length: 64 })
  fullName!: string;

  @Column({ length: 16 })
  phoneNumber!: string;

  @Column({ length: 2000 })
  question!: string;

  @Column({ type: 'enum', enum: QuestionStatus })
  status!: QuestionStatus;
}
