import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsString, IsOptional} from "class-validator";

export class GetAllApplicationsFilters {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fullName?: string;
}
