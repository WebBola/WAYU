import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { GetAllQuestionsResponse } from "./queries/get-all-questions/get-all-questions.response";
import { GetAllQuestionsFilters } from "./queries/get-all-questions/get-all-questions.filters";
import { GetAllQuestionsQuery } from "./queries/get-all-questions/get-all-questions.query";
import { GetOneQuestionResponse } from "./queries/get-one-question/get-one-question.response";
import { GetOneQuestionQuery } from "./queries/get-one-question/get-one-question.query";

@ApiTags('Public Questions')
@Controller('public/questions')
export class PublicQuestionController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetAllQuestionsResponse] })
  async getAllQuestions(@Query() filters: GetAllQuestionsFilters) {
    return await this.queryBus.execute(new GetAllQuestionsQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneQuestionResponse })
  async getOneQuestion(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneQuestionQuery(id));
  }
}
