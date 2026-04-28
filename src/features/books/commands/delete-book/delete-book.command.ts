import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Command } from "@nestjs/cqrs";

export class DeleteBookCommand {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  id!: number;
}
