import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class CreateVacancyResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  title!: string;

  @Expose()
  @ApiProperty()
  address!: string;

  @Expose()
  @ApiProperty()
  description!: string;

  @Expose()
  @ApiProperty()
  phoneNumber!: string;

  @Expose()
  @ApiProperty()
  type!: string;

  @Expose()
  @ApiProperty()
  salary!: string;

  @Expose()
  @ApiProperty()
  isActive!: boolean;

  @Expose()
  @ApiProperty()
  createdAt!: Date;

  @Expose()
  @ApiProperty()
  updatedAt!: Date;
}
