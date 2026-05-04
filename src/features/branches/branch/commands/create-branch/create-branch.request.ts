import {ApiProperty} from "@nestjs/swagger";
import {IsInt, IsString, MaxLength, Min, IsNumber, IsDecimal} from "class-validator";
import {Type} from "class-transformer";

export class CreateBranchRequest {
  @IsInt()
  @Min(1)
  @ApiProperty()
  @Type(() => Number)
  countryId!: number;

  @IsInt()
  @Min(1)
  @ApiProperty()
  @Type(() => Number)
  representativeId!: number;

  @IsString()
  @MaxLength(64)
  @ApiProperty()
  city!: string;

  @IsNumber()
  @IsDecimal()
  @ApiProperty()
  @Type(() => Number)
  latitude!: number;

  @IsNumber()
  @IsDecimal()
  @ApiProperty()
  @Type(() => Number)
  longitude!: number;

  @IsString()
  @MaxLength(16)
  @ApiProperty()
  phoneNumber!: string;
}
