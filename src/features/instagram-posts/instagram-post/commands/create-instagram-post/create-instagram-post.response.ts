import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class CreateInstagramPostResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  link!: string;

  @Expose()
  @ApiProperty()
  image!: string;

}
