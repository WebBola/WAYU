import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsInt, IsOptional, Min} from "class-validator";
import {Type} from "class-transformer";

export class GetAllBooksFilters {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  authorId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  categoryId?: number;
}
