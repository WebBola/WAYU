import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsInt, IsString, MaxLength, Min, IsDateString, IsOptional} from "class-validator";
import {Type} from "class-transformer";

export class UpdateEventRequest {
  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiPropertyOptional()
  @Type(() => Number)
  categoryId?: number;

  @IsString()
  @MaxLength(256)
  @IsOptional()
  @ApiPropertyOptional()
  title?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  content?: string;

  @ApiPropertyOptional({type: "string", format: "binary"})
  @IsOptional()
  image?: string;

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional()
  date?: string;

  @IsString()
  @MaxLength(128)
  @IsOptional()
  @ApiPropertyOptional()
  address?: string;
}
