import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class GetOneSocialLinkResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  title!: string;

  @Expose()
  @ApiProperty()
  icon!: string;

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
