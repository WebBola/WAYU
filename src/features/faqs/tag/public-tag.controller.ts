import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { GetAllTagsResponse } from "./queries/get-all-tags/get-all-tags.response";
import { GetAllTagsFilters } from "./queries/get-all-tags/get-all-tags.filters";
import { GetAllTagsQuery } from "./queries/get-all-tags/get-all-tags.query";
import { GetOneTagResponse } from "./queries/get-one-tag/get-one-tag.response";
import { GetOneTagQuery } from "./queries/get-one-tag/get-one-tag.query";

@ApiTags('Public Tags')
@Controller('public/tags')
export class PublicTagController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetAllTagsResponse] })
  async getAllTags(@Query() filters: GetAllTagsFilters) {
    return await this.queryBus.execute(new GetAllTagsQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneTagResponse })
  async getOneTag(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneTagQuery(id));
  }
}
