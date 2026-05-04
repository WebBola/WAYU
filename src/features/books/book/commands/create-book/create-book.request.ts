import {ApiProperty} from "@nestjs/swagger";
import {IsInt, IsString, MaxLength, Min, IsOptional} from "class-validator";
import {Type} from "class-transformer";

export class CreateBookRequest {
  @IsInt()
  @Min(1)
  @ApiProperty()
  @Type(() => Number)
  authorId!: number;

  @IsInt()
  @Min(1)
  @ApiProperty()
  @Type(() => Number)
  categoryId!: number;

  @IsString()
  @MaxLength(256)
  @ApiProperty()
  title!: string;

  @IsString()
  @MaxLength(512)
  @IsOptional()
  @ApiProperty()
  description?: string;

  @IsInt()
  @Min(1)
  @ApiProperty()
  @Type(() => Number)
  pages!: number;

  @IsInt()
  @Min(1900)
  @ApiProperty()
  @Type(() => Number)
  year!: number;

  @ApiProperty({type: "string", format: "binary"})
  image!: string;

  @ApiProperty({type: "string", format: "binary"})
  file!: string;
}
