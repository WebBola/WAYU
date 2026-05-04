import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsString, IsOptional} from "class-validator";

export class UpdateNewsCategoryRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
