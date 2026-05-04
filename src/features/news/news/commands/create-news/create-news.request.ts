import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {Allow, IsInt, IsString, IsOptional, IsDate, MaxLength, Min} from "class-validator";
import {Type} from "class-transformer";

export class CreateNewsRequest {
  @IsInt()
  @Min(1)
  @ApiProperty()
  @Type(() => Number)
  categoryId!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  countryId?: number;

  @IsString()
  @MaxLength(256)
  @ApiProperty()
  title!: string;

  @ApiProperty({type: "string", format: "binary"})
  @Allow()
  image!: string;

  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  date!: Date;

  @IsString()
  @ApiProperty()
  content!: string;
}