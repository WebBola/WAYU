import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsString, IsOptional, MaxLength} from "class-validator";

export class UpdateRepresentativeRequest {
  @IsString()
  @MaxLength(64)
  @IsOptional()
  @ApiPropertyOptional()
  fullName?: string;

  @IsString()
  @MaxLength(16)
  @IsOptional()
  @ApiPropertyOptional()
  phoneNumber?: string;
}
