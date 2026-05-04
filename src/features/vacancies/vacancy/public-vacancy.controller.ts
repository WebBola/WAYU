import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { GetAllVacanciesResponse } from "./queries/get-all-vacancies/get-all-vacancies.response";
import { GetAllVacanciesFilters } from "./queries/get-all-vacancies/get-all-vacancies.filters";
import { GetAllVacanciesQuery } from "./queries/get-all-vacancies/get-all-vacancies.query";
import { GetOneVacancyResponse } from "./queries/get-one-vacancy/get-one-vacancy.response";
import { GetOneVacancyQuery } from "./queries/get-one-vacancy/get-one-vacancy.query";

@ApiTags('Public Vacancies')
@Controller('public/vacancies')
export class PublicVacancyController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetAllVacanciesResponse] })
  async getAllVacancies(@Query() filters: GetAllVacanciesFilters) {
    return await this.queryBus.execute(new GetAllVacanciesQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneVacancyResponse })
  async getOneVacancy(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneVacancyQuery(id));
  }
}
