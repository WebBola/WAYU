import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Command } from "@nestjs/cqrs";
import { UpdateVacancyResponse } from "./update-vacancy.response";
import { VacancyType } from "@/core/enum/enum";

export class UpdateVacancyCommand extends Command<UpdateVacancyResponse> {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  id!: number;

  @IsString()
  @MaxLength(256)
  @IsOptional()
  @ApiPropertyOptional()
  title?: string;

  @IsString()
  @MaxLength(128)
  @IsOptional()
  @ApiPropertyOptional()
  address?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description?: string;

  @IsString()
  @MaxLength(16)
  @IsOptional()
  @ApiPropertyOptional()
  phoneNumber?: string;

  @IsEnum(VacancyType)
  @IsOptional()
  @ApiPropertyOptional({ enum: VacancyType })
  type?: VacancyType;

  @IsString()
  @MaxLength(64)
  @IsOptional()
  @ApiPropertyOptional()
  salary?: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  isActive?: boolean;
}
