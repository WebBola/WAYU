import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Command } from "@nestjs/cqrs";
import { DeleteVacancyResponse } from "./delete-vacancy.response";

export class DeleteVacancyCommand extends Command<DeleteVacancyResponse> {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  id!: number;
}
