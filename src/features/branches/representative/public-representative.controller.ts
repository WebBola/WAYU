import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { GetAllRepresentativesResponse } from "./queries/get-all-representatives/get-all-representatives.response";
import { GetAllRepresentativesFilters } from "./queries/get-all-representatives/get-all-representatives.filters";
import { GetAllRepresentativesQuery } from "./queries/get-all-representatives/get-all-representatives.query";
import { GetOneRepresentativeResponse } from "./queries/get-one-representative/get-one-representative.response";
import { GetOneRepresentativeQuery } from "./queries/get-one-representative/get-one-representative.query";

@ApiTags('Public Representatives')
@Controller('public/representatives')
export class PublicRepresentativeController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetAllRepresentativesResponse] })
  async getAllRepresentatives(@Query() filters: GetAllRepresentativesFilters) {
    return await this.queryBus.execute(new GetAllRepresentativesQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneRepresentativeResponse })
  async getOneRepresentative(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneRepresentativeQuery(id));
  }
}
