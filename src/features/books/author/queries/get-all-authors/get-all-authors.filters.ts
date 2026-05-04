import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsString, IsOptional} from "class-validator";

export class GetAllAuthorsFilters {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fullName?: string;
}
