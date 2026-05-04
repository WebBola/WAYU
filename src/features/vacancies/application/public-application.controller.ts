import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { GetAllApplicationsResponse } from "./queries/get-all-applications/get-all-applications.response";
import { GetAllApplicationsFilters } from "./queries/get-all-applications/get-all-applications.filters";
import { GetAllApplicationsQuery } from "./queries/get-all-applications/get-all-applications.query";
import { GetOneApplicationResponse } from "./queries/get-one-application/get-one-application.response";
import { GetOneApplicationQuery } from "./queries/get-one-application/get-one-application.query";

@ApiTags('Public Applications')
@Controller('public/applications')
export class PublicApplicationController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetAllApplicationsResponse] })
  async getAllApplications(@Query() filters: GetAllApplicationsFilters) {
    return await this.queryBus.execute(new GetAllApplicationsQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneApplicationResponse })
  async getOneApplication(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneApplicationQuery(id));
  }
}
