import { Command } from "@nestjs/cqrs";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class DeleteCountryCommand extends Command<void> {
    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    id!: number;
}