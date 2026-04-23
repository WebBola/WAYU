import { BaseEntity, Entity } from "typeorm";

@Entity()
export class BaseModel extends BaseEntity {
  id!: number;
  createdAt!: Date;
  updatedAt!: Date;
}