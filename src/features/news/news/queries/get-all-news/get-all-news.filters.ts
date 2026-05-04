import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsInt, IsOptional, Min} from "class-validator";
import {Type} from "class-transformer";

export class GetAllNewsFilters {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  categoryId?: number;
}
