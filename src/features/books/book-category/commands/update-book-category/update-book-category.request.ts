import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsString, IsOptional, MaxLength} from "class-validator";

export class UpdateBookCategoryRequest {
  @IsString()
  @MaxLength(64)
  @IsOptional()
  @ApiPropertyOptional()
  name?: string;
}
