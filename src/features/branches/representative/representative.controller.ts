import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";

import {CreateRepresentativeRequest} from "./commands/create-representative/create-representative.request";
import {CreateRepresentativeCommand} from "./commands/create-representative/create-representative.command";
import {CreateRepresentativeResponse} from "./commands/create-representative/create-representative.response";
import {GetAllRepresentativesResponse} from "./queries/get-all-representatives/get-all-representatives.response";
import {GetAllRepresentativesQuery} from "./queries/get-all-representatives/get-all-representatives.query";
import {GetAllRepresentativesFilters} from "./queries/get-all-representatives/get-all-representatives.filters";
import {GetOneRepresentativeResponse} from "./queries/get-one-representative/get-one-representative.response";
import {GetOneRepresentativeQuery} from "./queries/get-one-representative/get-one-representative.query";
import {UpdateRepresentativeRequest} from "./commands/update-representative/update-representative.request";
import {UpdateRepresentativeCommand} from "./commands/update-representative/update-representative.command";
import {UpdateRepresentativeResponse} from "./commands/update-representative/update-representative.response";
import {DeleteRepresentativeCommand} from "./commands/delete-representative/delete-representative.command";

@ApiTags('Representatives')
@Controller('admin/representative')
export class RepresentativeController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({type: [GetAllRepresentativesResponse]})
  async getAllRepresentatives(@Query() filters: GetAllRepresentativesFilters) {
    return await this.queryBus.execute(new GetAllRepresentativesQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneRepresentativeResponse })
  async getOneRepresentative(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneRepresentativeQuery(id));
  }

  @Post()
  @ApiCreatedResponse({type: CreateRepresentativeResponse})
  async createRepresentative(@Body() command: CreateRepresentativeCommand) {
    return await this.commandBus.execute(command);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateRepresentativeResponse })
  async updateRepresentative(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateRepresentativeRequest
  ) {
    const cmd = new UpdateRepresentativeCommand(payload.fullName, payload.phoneNumber);
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Delete(':id')
  @ApiOkResponse()
  async deleteRepresentative(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteRepresentativeCommand();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}
