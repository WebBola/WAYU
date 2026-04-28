import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Command } from "@nestjs/cqrs";
import { CreateVacancyResponse } from "./create-vacancy.response";
import { VacancyType } from "@/core/enum/enum";

export class CreateVacancyCommand extends Command<CreateVacancyResponse> {
  @IsString()
  @MaxLength(256)
  @IsNotEmpty()
  @ApiProperty()
  title!: string;

  @IsString()
  @MaxLength(128)
  @IsNotEmpty()
  @ApiProperty()
  address!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description!: string;

  @IsString()
  @MaxLength(16)
  @IsNotEmpty()
  @ApiProperty()
  phoneNumber!: string;

  @IsEnum(VacancyType)
  @IsNotEmpty()
  @ApiProperty({ enum: VacancyType })
  type!: VacancyType;

  @IsString()
  @MaxLength(64)
  @IsNotEmpty()
  @ApiProperty()
  salary!: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({ default: true })
  isActive?: boolean;
}
