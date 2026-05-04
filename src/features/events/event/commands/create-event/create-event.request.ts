import {ApiProperty} from "@nestjs/swagger";
import {IsInt, IsString, MaxLength, Min, IsDateString} from "class-validator";
import {Type} from "class-transformer";

export class CreateEventRequest {
  @IsInt()
  @Min(1)
  @ApiProperty()
  @Type(() => Number)
  categoryId!: number;

  @IsString()
  @MaxLength(256)
  @ApiProperty()
  title!: string;

  @IsString()
  @ApiProperty()
  content!: string;

  @ApiProperty({type: "string", format: "binary"})
  image!: string;

  @IsDateString()
  @ApiProperty()
  date!: string;

  @IsString()
  @MaxLength(128)
  @ApiProperty()
  address!: string;
}
