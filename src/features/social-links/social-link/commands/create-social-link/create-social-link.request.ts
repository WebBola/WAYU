import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsString, IsOptional, IsEnum} from "class-validator";

export class CreateSocialLinkRequest {
  @ApiProperty()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsString()
  link!: string;

  @ApiProperty({type: "string", format: "binary"})
  icon!: any;
}
