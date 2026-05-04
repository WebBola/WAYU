import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { GetAllNewsCategoriesResponse } from "./queries/get-all-news-categories/get-all-news-categories.response";
import { GetAllNewsCategoriesFilters } from "./queries/get-all-news-categories/get-all-news-categories.filters";
import { GetAllNewsCategoriesQuery } from "./queries/get-all-news-categories/get-all-news-categories.query";
import { GetOneNewsCategoryResponse } from "./queries/get-one-news-category/get-one-news-category.response";
import { GetOneNewsCategoryQuery } from "./queries/get-one-news-category/get-one-news-category.query";

@ApiTags('Public News Categories')
@Controller('public/news-categories')
export class PublicNewsCategoryController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetAllNewsCategoriesResponse] })
  async getAllNewsCategories(@Query() filters: GetAllNewsCategoriesFilters) {
    return await this.queryBus.execute(new GetAllNewsCategoriesQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneNewsCategoryResponse })
  async getOneNewsCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneNewsCategoryQuery(id));
  }
}
