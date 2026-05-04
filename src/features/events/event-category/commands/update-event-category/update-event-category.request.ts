import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsString, IsOptional, MaxLength} from "class-validator";

export class UpdateEventCategoryRequest {
  @IsString()
  @MaxLength(64)
  @IsOptional()
  @ApiPropertyOptional()
  title?: string;
}
