import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsString, IsOptional, IsBoolean} from "class-validator";

export class GetAllVacanciesFilters {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
