import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsString, IsOptional} from "class-validator";

export class GetAllBookCategoriesFilters {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
