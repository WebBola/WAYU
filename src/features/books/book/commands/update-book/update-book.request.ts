import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsInt, IsString, MaxLength, Min, IsOptional} from "class-validator";
import {Type} from "class-transformer";

export class UpdateBookRequest {
  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiPropertyOptional()
  @Type(() => Number)
  authorId?: number;

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
  @MaxLength(512)
  @IsOptional()
  @ApiPropertyOptional()
  description?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiPropertyOptional()
  @Type(() => Number)
  pages?: number;

  @IsInt()
  @Min(1900)
  @IsOptional()
  @ApiPropertyOptional()
  @Type(() => Number)
  year?: number;

  @ApiPropertyOptional({type: "string", format: "binary"})
  @IsOptional()
  image?: string;

  @ApiPropertyOptional({type: "string", format: "binary"})
  @IsOptional()
  file?: string;
}
