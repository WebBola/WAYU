import {ApiProperty} from "@nestjs/swagger";
import {IsString, IsBoolean, IsOptional} from "class-validator";

export class CreateVacancyRequest {
  @ApiProperty()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsString()
  address!: string;

  @ApiProperty()
  @IsString()
  description!: string;

  @ApiProperty()
  @IsString()
  phoneNumber!: string;

  @ApiProperty()
  @IsString()
  type!: string;

  @ApiProperty()
  @IsString()
  salary!: string;

  @ApiProperty()
  @IsBoolean()
  isActive!: boolean;
}
