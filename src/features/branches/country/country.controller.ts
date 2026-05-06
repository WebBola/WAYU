import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";

import {CreateCountryRequest} from "./commands/create-country/create-country.request";
import {CreateCountryCommand} from "./commands/create-country/create-country.command";
import {CreateCountryResponse} from "./commands/create-country/create-country.response";
import {GetAllCountriesResponse} from "./queries/get-all-countries/get-all-countries.response";
import {GetAllCountriesQuery} from "./queries/get-all-countries/get-all-countries.query";
import {GetAllCountriesFilters} from "./queries/get-all-countries/get-all-countries.filters";
import {GetOneCountryResponse} from "./queries/get-one-country/get-one-country.response";
import {GetOneCountryQuery} from "./queries/get-one-country/get-one-country.query";
import {UpdateCountryRequest} from "./commands/update-country/update-country.request";
import {UpdateCountryCommand} from "./commands/update-country/update-country.command";
import {UpdateCountryResponse} from "./commands/update-country/update-country.response";
import {DeleteCountryCommand} from "./commands/delete-country/delete-country.command";

@ApiTags('BranchCountries')
@Controller('admin/branch-country')
export class CountryController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({type: [GetAllCountriesResponse]})
  async getAllCountries(@Query() filters: GetAllCountriesFilters) {
    return await this.queryBus.execute(new GetAllCountriesQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneCountryResponse })
  async getOneCountry(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneCountryQuery(id));
  }

  @Post()
  @ApiOkResponse({type: CreateCountryResponse})
  async createCountry(@Body() payload: CreateCountryRequest) {
    const command = new CreateCountryCommand(payload.name)
    return await this.commandBus.execute(command);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateCountryResponse })
  async updateCountry(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCountryRequest
  ) {
    const cmd = new UpdateCountryCommand(payload.name);
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Delete(':id')
  @ApiOkResponse()
  async deleteCountry(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteCountryCommand();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}
