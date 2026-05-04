import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsString, IsOptional, IsEnum} from "class-validator";

export class CreateStaticInfoRequest {
  @ApiProperty({required: false})
  @IsString()
  @IsOptional()
  appStoreLink?: string;

  @ApiProperty({required: false})
  @IsString()
  @IsOptional()
  playMarketLink?: string;

  @ApiProperty()
  @IsString()
  aboutUs!: string;

}
