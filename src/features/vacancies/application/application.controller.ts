import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";

import {CreateApplicationRequest} from "./commands/create-application/create-application.request";
import {CreateApplicationCommand} from "./commands/create-application/create-application.command";
import {CreateApplicationResponse} from "./commands/create-application/create-application.response";
import {GetAllApplicationsResponse} from "./queries/get-all-applications/get-all-applications.response";
import {GetAllApplicationsQuery} from "./queries/get-all-applications/get-all-applications.query";
import {GetAllApplicationsFilters} from "./queries/get-all-applications/get-all-applications.filters";
import {GetOneApplicationResponse} from "./queries/get-one-application/get-one-application.response";
import {GetOneApplicationQuery} from "./queries/get-one-application/get-one-application.query";
import {UpdateApplicationRequest} from "./commands/update-application/update-application.request";
import {UpdateApplicationCommand} from "./commands/update-application/update-application.command";
import {UpdateApplicationResponse} from "./commands/update-application/update-application.response";
import {DeleteApplicationCommand} from "./commands/delete-application/delete-application.command";

@ApiTags('Applications')
@Controller('admin/application')
export class ApplicationController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({type: [GetAllApplicationsResponse]})
  async getAllApplications(@Query() filters: GetAllApplicationsFilters) {
    return await this.queryBus.execute(new GetAllApplicationsQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneApplicationResponse })
  async getOneApplication(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneApplicationQuery(id));
  }

  @Post()
  @ApiCreatedResponse({type: CreateApplicationResponse})
  async createApplication(@Body() command: CreateApplicationCommand) {
    return await this.commandBus.execute(command);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateApplicationResponse })
  async updateApplication(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateApplicationRequest
  ) {
    const cmd = new UpdateApplicationCommand(payload.fullName, payload.email, payload.phoneNumber);
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Delete(':id')
  @ApiOkResponse()
  async deleteApplication(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteApplicationCommand();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}
