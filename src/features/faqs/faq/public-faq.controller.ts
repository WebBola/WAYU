import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { GetAllFaqsResponse } from "./queries/get-all-faqs/get-all-faqs.response";
import { GetAllFaqsFilters } from "./queries/get-all-faqs/get-all-faqs.filters";
import { GetAllFaqsQuery } from "./queries/get-all-faqs/get-all-faqs.query";
import { GetOneFaqResponse } from "./queries/get-one-faq/get-one-faq.response";
import { GetOneFaqQuery } from "./queries/get-one-faq/get-one-faq.query";

@ApiTags('Public FAQs')
@Controller('public/faqs')
export class PublicFaqController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetAllFaqsResponse] })
  async getAllFaqs(@Query() filters: GetAllFaqsFilters) {
    return await this.queryBus.execute(new GetAllFaqsQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneFaqResponse })
  async getOneFaq(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneFaqQuery(id));
  }
}
