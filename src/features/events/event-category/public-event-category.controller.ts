import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { GetAllEventCategoriesResponse } from "./queries/get-all-event-categories/get-all-event-categories.response";
import { GetAllEventCategoriesFilters } from "./queries/get-all-event-categories/get-all-event-categories.filters";
import { GetAllEventCategoriesQuery } from "./queries/get-all-event-categories/get-all-event-categories.query";
import { GetOneEventCategoryResponse } from "./queries/get-one-event-category/get-one-event-category.response";
import { GetOneEventCategoryQuery } from "./queries/get-one-event-category/get-one-event-category.query";

@ApiTags('Public Event Categories')
@Controller('public/event-categories')
export class PublicEventCategoryController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetAllEventCategoriesResponse] })
  async getAllEventCategories(@Query() filters: GetAllEventCategoriesFilters) {
    return await this.queryBus.execute(new GetAllEventCategoriesQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneEventCategoryResponse })
  async getOneEventCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneEventCategoryQuery(id));
  }
}
