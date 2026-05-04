import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { GetAllBooksResponse } from "./queries/get-all-books/get-all-books.response";
import { GetAllBooksFilters } from "./queries/get-all-books/get-all-books.filters";
import { GetAllBooksQuery } from "./queries/get-all-books/get-all-books.query";
import { GetOneBookResponse } from "./queries/get-one-book/get-one-book.response";
import { GetOneBookQuery } from "./queries/get-one-book/get-one-book.query";

@ApiTags('Public Books')
@Controller('public/books')
export class PublicBookController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetAllBooksResponse] })
  async getAllBooks(@Query() filters: GetAllBooksFilters) {
    return await this.queryBus.execute(new GetAllBooksQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneBookResponse })
  async getOneBook(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneBookQuery(id));
  }
}
