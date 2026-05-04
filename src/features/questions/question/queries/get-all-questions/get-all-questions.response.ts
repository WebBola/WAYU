import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class GetAllQuestionsResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  fullName!: string;

  @Expose()
  @ApiProperty()
  phoneNumber!: string;

  @Expose()
  @ApiProperty()
  question!: string;

  @Expose()
  @ApiProperty()
  status!: string;

  @Expose()
  @ApiProperty()
  createdAt!: Date;

  @Expose()
  @ApiProperty()
  updatedAt!: Date;
}
