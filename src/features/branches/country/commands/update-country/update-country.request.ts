import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsString, IsOptional, MaxLength} from "class-validator";

export class UpdateCountryRequest {
  @IsString()
  @MaxLength(64)
  @IsOptional()
  @ApiPropertyOptional()
  name?: string;
}
