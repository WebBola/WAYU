import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsString, IsOptional} from "class-validator";

export class GetAllFaqsFilters {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;
}
