import {ApiProperty} from "@nestjs/swagger";
import {Allow, IsString, MaxLength} from "class-validator";

export class CreateCountryRequest {
  @IsString()
  @MaxLength(64)
  @ApiProperty()
  title!: string;

  @ApiProperty({type: "string", format: "binary"})
  @Allow()
  flag!: string;
}
