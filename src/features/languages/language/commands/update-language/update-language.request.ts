import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsOptional, IsString, MaxLength} from "class-validator";

export class UpdateLanguageRequest {
  @IsString()
  @MaxLength(64)
  @IsOptional()
  @ApiPropertyOptional()
  title?: string;
}
