import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Vacancy } from '@/features/vacancies/vacancy/vacancy.entity';
import { BaseModel } from '@/core/base-model';
import { ApplicationStatus } from '@/core/enum/enum';

@Entity('applications')
export class Application extends BaseModel {
  @Column({ length: 64 })
  fullName!: string;

  @Column({ length: 16 })
  phoneNumber!: string;

  @Column({ length: 64 })
  email!: string;

  @Column()
  vacancyId!: number;

  @ManyToOne(() => Vacancy)
  @JoinColumn({ name: 'vacancyId' })
  vacancy!: Vacancy;

  @Column({ length: 128 })
  resume!: string;

  @Column({ type: 'enum', enum: ApplicationStatus, default: ApplicationStatus.ACTIVE })
  status!: ApplicationStatus;
}
