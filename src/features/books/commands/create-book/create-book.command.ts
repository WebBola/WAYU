import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Command } from "@nestjs/cqrs";
import { CreateBookResponse } from "./create-book.response";

export class CreateBookCommand extends Command<CreateBookResponse> {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  authorId!: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  categoryId!: number;

  @IsString()
  @MaxLength(256)
  @IsNotEmpty()
  @ApiProperty()
  title!: string;

  @IsString()
  @MaxLength(128)
  @IsNotEmpty()
  @ApiProperty()
  image!: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description?: string;

  @IsString()
  @MaxLength(256)
  @IsNotEmpty()
  @ApiProperty()
  file!: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  pages!: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  year!: number;
}
