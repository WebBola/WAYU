import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class UpdateInstagramPostResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  image!: string;

  @Expose()
  @ApiProperty()
  link!: string;

  @Expose()
  @ApiProperty()
  createdAt!: Date;

  @Expose()
  @ApiProperty()
  updatedAt!: Date;
}
