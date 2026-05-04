import {ApiProperty} from "@nestjs/swagger";
import {IsString, MaxLength} from "class-validator";

export class CreateRepresentativeRequest {
  @IsString()
  @MaxLength(64)
  @ApiProperty()
  fullName!: string;

  @IsString()
  @MaxLength(128)
  @ApiProperty()
  image!: string;

  @IsString()
  @MaxLength(64)
  @ApiProperty()
  email!: string;

  @IsString()
  @MaxLength(16)
  @ApiProperty()
  phoneNumber!: string;

  @IsString()
  @ApiProperty()
  resume!: string;
}
