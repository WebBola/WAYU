import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {CreateFaqRequest} from "./commands/create-faq/create-faq.request";
import {CreateFaqCommand} from "./commands/create-faq/create-faq.command";
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";
import { GetAllFaqsResponse } from "./queries/get-all-faqs/get-all-faqs.response";
import { GetAllFaqsFilters } from "./queries/get-all-faqs/get-all-faqs.filters";
import { GetAllFaqsQuery } from "./queries/get-all-faqs/get-all-faqs.query";
import { GetOneFaqResponse } from "./queries/get-one-faq/get-one-faq.response";
import { GetOneFaqQuery } from "./queries/get-one-faq/get-one-faq.query";
import { UpdateFaqRequest } from "./commands/update-faq/update-faq.request";
import { UpdateFaqCommand } from "./commands/update-faq/update-faq.command";
import { UpdateFaqResponse } from "./commands/update-faq/update-faq.response";
import { DeleteFaqCommand } from "./commands/delete-faq/delete-faq.command";

@ApiTags('FAQs')
@Controller('admin/faqs')
export class FaqController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @Post()
  @ApiOkResponse({ type: CreateFaqCommand })
  async createFaq(@Body() payload: CreateFaqRequest) {
    const cmd = new CreateFaqCommand(payload.question, payload.answer, payload.tagIds);
    return await this.commandBus.execute(cmd);
  }

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

  @Patch(':id')
  @ApiOkResponse({ type: UpdateFaqResponse })
  async updateFaq(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateFaqRequest
  ) {
    const cmd = new UpdateFaqCommand(payload.question, payload.answer, payload.tagIds);
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Delete(':id')
  @ApiOkResponse()
  async deleteFaq(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteFaqCommand();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}
