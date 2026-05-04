import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { GetAllNewsResponse } from "./queries/get-all-news/get-all-news.response";
import { GetAllNewsFilters } from "./queries/get-all-news/get-all-news.filters";
import { GetAllNewsQuery } from "./queries/get-all-news/get-all-news.query";
import { GetOneNewsResponse } from "./queries/get-one-news/get-one-news.response";
import { GetOneNewsQuery } from "./queries/get-one-news/get-one-news.query";

@ApiTags('Public News')
@Controller('public/news')
export class PublicNewsController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetAllNewsResponse] })
  async getAllNews(@Query() filters: GetAllNewsFilters) {
    return await this.queryBus.execute(new GetAllNewsQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneNewsResponse })
  async getOneNews(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneNewsQuery(id));
  }
}
