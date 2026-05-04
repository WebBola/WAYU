import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsString, IsOptional, MaxLength} from "class-validator";

export class UpdateAuthorRequest {
  @IsString()
  @MaxLength(64)
  @IsOptional()
  @ApiPropertyOptional()
  fullName?: string;
}
