import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from "@nestjs/common";
import {ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";

import {CreateNewsCategoryCommand} from "./commands/create-news-category/create-news-category.command";
import {CreateNewsCategoryResponse} from "./commands/create-news-category/create-news-category.response";
import {GetAllNewsCategoriesResponse} from "./queries/get-all-news-categories/get-all-news-categories.response";
import {GetAllNewsCategoriesQuery} from "./queries/get-all-news-categories/get-all-news-categories.query";
import {GetAllNewsCategoriesFilters} from "./queries/get-all-news-categories/get-all-news-categories.filters";
import {GetOneNewsCategoryResponse} from "./queries/get-one-news-category/get-one-news-category.response";
import {GetOneNewsCategoryQuery} from "./queries/get-one-news-category/get-one-news-category.query";
import {UpdateNewsCategoryRequest} from "./commands/update-news-category/update-news-category.request";
import {UpdateNewsCategoryCommand} from "./commands/update-news-category/update-news-category.command";
import {UpdateNewsCategoryResponse} from "./commands/update-news-category/update-news-category.response";
import { DeleteNewsCategoryCommand } from "./commands/delete-news-category/delete-news-category.command";

@ApiTags('News Categories')
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

  @Get(':id')
  @ApiOkResponse({ type: GetOneNewsCategoryResponse })
  async getOneNewsCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.queriesBus.execute(new GetOneNewsCategoryQuery(id));
  }

  @Post()
  @ApiCreatedResponse({type: CreateNewsCategoryResponse})
  async createNewsCategory(@Body() command: CreateNewsCategoryCommand) {
    return await this.commandBus.execute(command);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateNewsCategoryResponse })
  async updateNewsCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateNewsCategoryRequest
  ) {
    const cmd = new UpdateNewsCategoryCommand(payload.name);
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Delete(':id')
  @ApiOkResponse()
  async deleteNewsCategory(@Param('id', ParseIntPipe) id: number){
    const cmd = new DeleteNewsCategoryCommand()
    cmd.id = id;
    return await this.commandBus.execute(cmd)
  }
}