import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";

import {CreateEventCategoryRequest} from "./commands/create-event-category/create-event-category.request";
import {CreateEventCategoryCommand} from "./commands/create-event-category/create-event-category.command";
import {CreateEventCategoryResponse} from "./commands/create-event-category/create-event-category.response";
import {GetAllEventCategoriesResponse} from "./queries/get-all-event-categories/get-all-event-categories.response";
import {GetAllEventCategoriesQuery} from "./queries/get-all-event-categories/get-all-event-categories.query";
import {GetAllEventCategoriesFilters} from "./queries/get-all-event-categories/get-all-event-categories.filters";
import {GetOneEventCategoryResponse} from "./queries/get-one-event-category/get-one-event-category.response";
import {GetOneEventCategoryQuery} from "./queries/get-one-event-category/get-one-event-category.query";
import {UpdateEventCategoryRequest} from "./commands/update-event-category/update-event-category.request";
import {UpdateEventCategoryCommand} from "./commands/update-event-category/update-event-category.command";
import {UpdateEventCategoryResponse} from "./commands/update-event-category/update-event-category.response";
import {DeleteEventCategoryCommand} from "./commands/delete-event-category/delete-event-category.command";

@ApiTags('EventCategories')
@Controller('admin/event-category')
export class EventCategoryController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({type: [GetAllEventCategoriesResponse]})
  async getAllEventCategories(@Query() filters: GetAllEventCategoriesFilters) {
    return await this.queryBus.execute(new GetAllEventCategoriesQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneEventCategoryResponse })
  async getOneEventCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneEventCategoryQuery(id));
  }

  @Post()
  @ApiOkResponse({type: CreateEventCategoryResponse})
  async createEventCategory(@Body() payload: CreateEventCategoryRequest) {
    const command = new CreateEventCategoryCommand(payload.title);
    return await this.commandBus.execute(command);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateEventCategoryResponse })
  async updateEventCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateEventCategoryRequest
  ) {
    const cmd = new UpdateEventCategoryCommand(payload.title);
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Delete(':id')
  @ApiOkResponse()
  async deleteEventCategory(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteEventCategoryCommand();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}
