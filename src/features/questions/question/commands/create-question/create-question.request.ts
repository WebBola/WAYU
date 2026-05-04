import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsString, IsOptional, IsEnum} from "class-validator";
import {QuestionStatus} from "@/core/enum/enum";

export class CreateQuestionRequest {
  @ApiProperty()
  @IsString()
  fullName!: string;

  @ApiProperty()
  @IsString()
  phoneNumber!: string;

  @ApiProperty()
  @IsString()
  question!: string;

  @ApiProperty({enum: QuestionStatus})
  @IsEnum(QuestionStatus)
  status!: QuestionStatus;

}
