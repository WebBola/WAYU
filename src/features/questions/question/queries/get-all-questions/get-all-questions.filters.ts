import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsString, IsOptional} from "class-validator";

export class GetAllQuestionsFilters {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  status?: string;
}
