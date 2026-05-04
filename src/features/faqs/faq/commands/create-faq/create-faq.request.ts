import {ApiProperty} from "@nestjs/swagger";
import {IsString, MaxLength, IsArray, IsOptional} from "class-validator";
import {Type} from "class-transformer";

export class CreateFaqRequest {
  @IsString()
  @MaxLength(256)
  @ApiProperty()
  question!: string;

  @IsString()
  @MaxLength(512)
  @ApiProperty()
  answer!: string;

  @IsArray()
  @IsOptional()
  @ApiProperty({ type: [Number] })
  @Type(() => Number)
  tagIds?: number[];
}
