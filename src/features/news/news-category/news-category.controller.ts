import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {Body, Controller, Get, Post, Query} from "@nestjs/common";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";

import {CreateNewsCategoryCommand} from "./commands/create-news-category/create-news-category.command";
import {CreateNewsCategoryResponse} from "./commands/create-news-category/create-news-category.response";
import {GetAllNewsCategoriesResponse} from "./queries/get-all-news-categories/get-all-news-categories.response";
import {GetAllNewsCategoriesQuery} from "./queries/get-all-news-categories/get-all-news-categories.query";
import {GetAllNewsCategoriesFilters} from "./queries/get-all-news-categories/get-all-news-categories.filters";

@Controller('admin/news-category')
export class NewsCategoryController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queriesBus: QueryBus,
  ) {
  }

  @Get()
  @ApiOkResponse({type: [GetAllNewsCategoriesResponse]})
  async getAllNewsCategories(@Query() filters: GetAllNewsCategoriesFilters) {
    return await this.queriesBus.execute(new GetAllNewsCategoriesQuery(filters));
  }

  @Post()
  @ApiCreatedResponse({type: CreateNewsCategoryResponse})
  async createNewsCategory(@Body() command: CreateNewsCategoryCommand) {
    return await this.commandBus.execute(command);
  }
}