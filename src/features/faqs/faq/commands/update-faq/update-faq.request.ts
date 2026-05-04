import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsString, MaxLength, IsArray, IsOptional} from "class-validator";
import {Type} from "class-transformer";

export class UpdateFaqRequest {
  @IsString()
  @MaxLength(256)
  @IsOptional()
  @ApiPropertyOptional()
  question?: string;

  @IsString()
  @MaxLength(512)
  @IsOptional()
  @ApiPropertyOptional()
  answer?: string;

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional({ type: [Number] })
  @Type(() => Number)
  tagIds?: number[];
}
