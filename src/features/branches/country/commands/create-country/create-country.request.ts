import {ApiProperty} from "@nestjs/swagger";
import {IsString, MaxLength} from "class-validator";

export class CreateCountryRequest {
  @IsString()
  @MaxLength(64)
  @ApiProperty()
  name!: string;
}
