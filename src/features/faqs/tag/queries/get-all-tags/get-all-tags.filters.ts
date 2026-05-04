import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsString, IsOptional} from "class-validator";

export class GetAllTagsFilters {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title?: string;
}
