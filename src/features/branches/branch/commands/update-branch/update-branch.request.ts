import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsInt, IsString, MaxLength, Min, IsNumber, IsDecimal, IsOptional} from "class-validator";
import {Type} from "class-transformer";

export class UpdateBranchRequest {
  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiPropertyOptional()
  @Type(() => Number)
  countryId?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiPropertyOptional()
  @Type(() => Number)
  representativeId?: number;

  @IsString()
  @MaxLength(64)
  @IsOptional()
  @ApiPropertyOptional()
  city?: string;

  @IsNumber()
  @IsDecimal()
  @IsOptional()
  @ApiPropertyOptional()
  @Type(() => Number)
  latitude?: number;

  @IsNumber()
  @IsDecimal()
  @IsOptional()
  @ApiPropertyOptional()
  @Type(() => Number)
  longitude?: number;

  @IsString()
  @MaxLength(16)
  @IsOptional()
  @ApiPropertyOptional()
  phoneNumber?: string;
}
