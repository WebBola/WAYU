import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class CreateSocialLinkResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  title!: string;

  @Expose()
  @ApiProperty()
  link!: string;

  @Expose()
  @ApiProperty()
  icon!: string;

}
