import {ApiProperty} from "@nestjs/swagger";
import {IsString, MaxLength} from "class-validator";

export class CreateAuthorRequest {
  @IsString()
  @MaxLength(64)
  @ApiProperty()
  fullName!: string;
}
