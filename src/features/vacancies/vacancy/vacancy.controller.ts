import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {CreateVacancyRequest} from "./commands/create-vacancy/create-vacancy.request";
import {CreateVacancyCommand} from "./commands/create-vacancy/create-vacancy.command";
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";
import { GetAllVacanciesResponse } from "./queries/get-all-vacancies/get-all-vacancies.response";
import { GetAllVacanciesFilters } from "./queries/get-all-vacancies/get-all-vacancies.filters";
import { GetAllVacanciesQuery } from "./queries/get-all-vacancies/get-all-vacancies.query";
import { GetOneVacancyResponse } from "./queries/get-one-vacancy/get-one-vacancy.response";
import { GetOneVacancyQuery } from "./queries/get-one-vacancy/get-one-vacancy.query";
import { UpdateVacancyRequest } from "./commands/update-vacancy/update-vacancy.request";
import { UpdateVacancyCommand } from "./commands/update-vacancy/update-vacancy.command";
import { UpdateVacancyResponse } from "./commands/update-vacancy/update-vacancy.response";
import { DeleteVacancyCommand } from "./commands/delete-vacancy/delete-vacancy.command";

@ApiTags('Vacancies')
@Controller('admin/vacancies')
export class VacancyController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @Post()
  @ApiOkResponse({ type: CreateVacancyCommand })
  async createVacancy(@Body() payload: CreateVacancyRequest) {
    const cmd = new CreateVacancyCommand(
      payload.title,
      payload.address,
      payload.description,
      payload.phoneNumber,
      payload.type,
      payload.salary,
      payload.isActive
    );
    return await this.commandBus.execute(cmd);
  }

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

  @Patch(':id')
  @ApiOkResponse({ type: UpdateVacancyResponse })
  async updateVacancy(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateVacancyRequest
  ) {
    const cmd = new UpdateVacancyCommand(
      payload.title,
      payload.address,
      payload.description,
      payload.phoneNumber,
      payload.type,
      payload.salary,
      payload.isActive
    );
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Delete(':id')
  @ApiOkResponse()
  async deleteVacancy(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteVacancyCommand();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}
