import {ApiProperty} from "@nestjs/swagger";
import {IsString, MaxLength} from "class-validator";

export class CreateEventCategoryRequest {
  @IsString()
  @MaxLength(64)
  @ApiProperty()
  title!: string;
}
