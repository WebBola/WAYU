import { Entity, Column } from 'typeorm';
import { BaseModel } from 'src/core/base-model';
@Entity('static_info')
export class StaticInfo extends BaseModel {
  @Column({ length: 128, nullable: true })
  appStoreLink!: string | null;

  @Column({ length: 128, nullable: true })
  playMarketLink!: string | null;

  @Column({ type: 'text' })
  aboutUs!: string;
}
