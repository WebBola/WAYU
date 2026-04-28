import {Expose} from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";

export class DeleteVacancyResponse {
  @Expose()
  @ApiProperty()
  success!: boolean;
}
