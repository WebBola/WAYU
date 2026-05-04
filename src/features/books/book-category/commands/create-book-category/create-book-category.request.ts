import {ApiProperty} from "@nestjs/swagger";
import {IsString, MaxLength} from "class-validator";

export class CreateBookCategoryRequest {
  @IsString()
  @MaxLength(64)
  @ApiProperty()
  name!: string;
}
