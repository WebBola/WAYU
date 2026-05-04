import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class GetOneNewsResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  categoryId!: number;

  @Expose()
  @ApiProperty()
  title!: string;

  @Expose()
  @ApiProperty()
  image!: string;

  @Expose()
  @ApiProperty()
  createdAt!: Date;
}
