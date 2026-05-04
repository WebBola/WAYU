import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsString, IsOptional} from "class-validator";

export class GetAllEventCategoriesFilters {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title?: string;
}
