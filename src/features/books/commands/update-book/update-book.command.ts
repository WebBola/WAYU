import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Command } from "@nestjs/cqrs";
import { UpdateBookResponse } from "./update-book.response";

export class UpdateBookCommand extends Command<UpdateBookResponse> {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  id!: number;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  authorId?: number;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  categoryId?: number;

  @IsString()
  @MaxLength(256)
  @IsOptional()
  @ApiPropertyOptional()
  title?: string;

  @IsString()
  @MaxLength(128)
  @IsOptional()
  @ApiPropertyOptional()
  image?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description?: string;

  @IsString()
  @MaxLength(256)
  @IsOptional()
  @ApiPropertyOptional()
  file?: string;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  pages?: number;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  year?: number;
}
