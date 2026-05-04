import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsString, IsOptional} from "class-validator";

export class GetAllCountriesFilters {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
