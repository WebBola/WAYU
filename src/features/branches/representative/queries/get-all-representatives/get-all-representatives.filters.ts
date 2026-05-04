import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsString, IsOptional} from "class-validator";

export class GetAllRepresentativesFilters {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fullName?: string;
}
