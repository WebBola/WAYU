import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsString, IsOptional, MaxLength} from "class-validator";

export class UpdateApplicationRequest {
  @IsString()
  @MaxLength(64)
  @IsOptional()
  @ApiPropertyOptional()
  fullName?: string;

  @IsString()
  @MaxLength(64)
  @IsOptional()
  @ApiPropertyOptional()
  email?: string;

  @IsString()
  @MaxLength(16)
  @IsOptional()
  @ApiPropertyOptional()
  phoneNumber?: string;
}
