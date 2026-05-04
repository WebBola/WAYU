import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class GetOneFaqResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  question!: string;

  @Expose()
  @ApiProperty()
  answer!: string;

  @Expose()
  @ApiProperty()
  createdAt!: Date;

  @Expose()
  @ApiProperty()
  updatedAt!: Date;
}
