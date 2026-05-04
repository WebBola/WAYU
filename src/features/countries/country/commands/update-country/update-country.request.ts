import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString, MaxLength} from "class-validator";

export class UpdateCountryRequest {
  @IsString()
  @MaxLength(64)
  @IsOptional()
  @ApiProperty({required: false})
  title?: string;

  @ApiProperty({type: "string", format: "binary", required: false})
  @IsOptional()
  flag?: string;
}
