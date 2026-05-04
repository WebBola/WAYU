import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsInt, IsOptional, IsString, IsDate, MaxLength, Min} from "class-validator";
import {Type} from "class-transformer";

export class UpdateNewsRequest {
  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiPropertyOptional()
  @Type(() => Number)
  categoryId?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiPropertyOptional()
  @Type(() => Number)
  countryId?: number;

  @IsString()
  @MaxLength(256)
  @IsOptional()
  @ApiPropertyOptional()
  title?: string;

  @ApiPropertyOptional({type: "string", format: "binary"})
  @IsOptional()
  image?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiPropertyOptional()
  date?: Date;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  content?: string;
}
