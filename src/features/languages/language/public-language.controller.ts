import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { GetAllLanguagesResponse } from "./queries/get-all-languages/get-all-languages.response";
import { GetAllLanguagesFilters } from "./queries/get-all-languages/get-all-languages.filters";
import { GetAllLanguagesQuery } from "./queries/get-all-languages/get-all-languages.query";
import { GetOneLanguageResponse } from "./queries/get-one-language/get-one-language.response";
import { GetOneLanguageQuery } from "./queries/get-one-language/get-one-language.query";

@ApiTags('Public Languages')
@Controller('public/languages')
export class PublicLanguageController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetAllLanguagesResponse] })
  async getAllLanguages(@Query() filters: GetAllLanguagesFilters) {
    return await this.queryBus.execute(new GetAllLanguagesQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneLanguageResponse })
  async getOneLanguage(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneLanguageQuery(id));
  }
}
