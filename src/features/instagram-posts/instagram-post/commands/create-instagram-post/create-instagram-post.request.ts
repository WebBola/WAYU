import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsString, IsOptional, IsEnum} from "class-validator";

export class CreateInstagramPostRequest {
  @ApiProperty()
  @IsString()
  link!: string;

  @ApiProperty({type: "string", format: "binary"})
  image!: any;
}
