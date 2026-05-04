import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { GetAllBookCategoriesResponse } from "./queries/get-all-book-categories/get-all-book-categories.response";
import { GetAllBookCategoriesFilters } from "./queries/get-all-book-categories/get-all-book-categories.filters";
import { GetAllBookCategoriesQuery } from "./queries/get-all-book-categories/get-all-book-categories.query";
import { GetOneBookCategoryResponse } from "./queries/get-one-book-category/get-one-book-category.response";
import { GetOneBookCategoryQuery } from "./queries/get-one-book-category/get-one-book-category.query";

@ApiTags('Public Book Categories')
@Controller('public/book-categories')
export class PublicBookCategoryController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetAllBookCategoriesResponse] })
  async getAllBookCategories(@Query() filters: GetAllBookCategoriesFilters) {
    return await this.queryBus.execute(new GetAllBookCategoriesQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneBookCategoryResponse })
  async getOneBookCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneBookCategoryQuery(id));
  }
}
