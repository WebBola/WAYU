import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class CreateNewsResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  categoryId!: number;

  @Expose()
  @ApiPropertyOptional()
  countryId?: number;

  @Expose()
  @ApiProperty()
  title!: string;

  @Expose()
  @ApiProperty()
  image!: string;

  @Expose()
  @ApiProperty()
  date!: Date;

  @Expose()
  @ApiProperty()
  content!: string;

  @Expose()
  @ApiProperty()
  createdAt!: Date;

  @Expose()
  @ApiProperty()
  updatedAt!: Date;
}