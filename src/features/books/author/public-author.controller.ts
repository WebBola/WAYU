import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { GetAllAuthorsResponse } from "./queries/get-all-authors/get-all-authors.response";
import { GetAllAuthorsFilters } from "./queries/get-all-authors/get-all-authors.filters";
import { GetAllAuthorsQuery } from "./queries/get-all-authors/get-all-authors.query";
import { GetOneAuthorResponse } from "./queries/get-one-author/get-one-author.response";
import { GetOneAuthorQuery } from "./queries/get-one-author/get-one-author.query";

@ApiTags('Public Authors')
@Controller('public/authors')
export class PublicAuthorController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetAllAuthorsResponse] })
  async getAllAuthors(@Query() filters: GetAllAuthorsFilters) {
    return await this.queryBus.execute(new GetAllAuthorsQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneAuthorResponse })
  async getOneAuthor(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneAuthorQuery(id));
  }
}
