import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";

import {CreateBookCategoryRequest} from "./commands/create-book-category/create-book-category.request";
import {CreateBookCategoryCommand} from "./commands/create-book-category/create-book-category.command";
import {CreateBookCategoryResponse} from "./commands/create-book-category/create-book-category.response";
import {GetAllBookCategoriesResponse} from "./queries/get-all-book-categories/get-all-book-categories.response";
import {GetAllBookCategoriesQuery} from "./queries/get-all-book-categories/get-all-book-categories.query";
import {GetAllBookCategoriesFilters} from "./queries/get-all-book-categories/get-all-book-categories.filters";
import {GetOneBookCategoryResponse} from "./queries/get-one-book-category/get-one-book-category.response";
import {GetOneBookCategoryQuery} from "./queries/get-one-book-category/get-one-book-category.query";
import {UpdateBookCategoryRequest} from "./commands/update-book-category/update-book-category.request";
import {UpdateBookCategoryCommand} from "./commands/update-book-category/update-book-category.command";
import {UpdateBookCategoryResponse} from "./commands/update-book-category/update-book-category.response";
import {DeleteBookCategoryCommand} from "./commands/delete-book-category/delete-book-category.command";

@ApiTags('BookCategories')
@Controller('admin/book-category')
export class BookCategoryController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({type: [GetAllBookCategoriesResponse]})
  async getAllBookCategories(@Query() filters: GetAllBookCategoriesFilters) {
    return await this.queryBus.execute(new GetAllBookCategoriesQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneBookCategoryResponse })
  async getOneBookCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneBookCategoryQuery(id));
  }

  @Post()
  @ApiCreatedResponse({type: CreateBookCategoryResponse})
  async createBookCategory(@Body() payload: CreateBookCategoryRequest) {
    const command = new CreateBookCategoryCommand(payload.name)
    return await this.commandBus.execute(command);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateBookCategoryResponse })
  async updateBookCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBookCategoryRequest
  ) {
    const cmd = new UpdateBookCategoryCommand(payload.name);
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Delete(':id')
  @ApiOkResponse()
  async deleteBookCategory(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteBookCategoryCommand();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}
