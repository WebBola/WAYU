import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { GetAllCountryResponse } from "./queries/get-all-country/get-all-country.response";
import { GetAllCountryFilters } from "./queries/get-all-country/get-all-country.filters";
import { GetAllCountryQuery } from "./queries/get-all-country/get-all-country.query";
import { GetOneCountryResponse } from "./queries/get-one-country/get-one-country.response";
import { GetOneCountryQuery } from "./queries/get-one-country/get-one-country.query";

@ApiTags('Public Countries')
@Controller('public/countries')
export class PublicCountryController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetAllCountryResponse] })
  async getAllCountries(@Query() filters: GetAllCountryFilters) {
    return await this.queryBus.execute(new GetAllCountryQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneCountryResponse })
  async getOneCountry(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneCountryQuery(id));
  }
}
