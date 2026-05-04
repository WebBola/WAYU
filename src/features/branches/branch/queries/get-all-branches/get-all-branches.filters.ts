import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsInt, IsOptional, Min} from "class-validator";
import {Type} from "class-transformer";

export class GetAllBranchesFilters {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  countryId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  representativeId?: number;
}
