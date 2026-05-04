import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiConsumes, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import fs from 'fs';
import {storageOptions} from "@/configs/multer.config";

import {CreateQuestionRequest} from "./commands/create-question/create-question.request";
import {CreateQuestionCommand} from "./commands/create-question/create-question.command";
import {CreateQuestionResponse} from "./commands/create-question/create-question.response";
import {GetAllQuestionsResponse} from "./queries/get-all-questions/get-all-questions.response";
import {GetAllQuestionsQuery} from "./queries/get-all-questions/get-all-questions.query";
import {GetAllQuestionsFilters} from "./queries/get-all-questions/get-all-questions.filters";
import {GetOneQuestionResponse} from "./queries/get-one-question/get-one-question.response";
import {GetOneQuestionQuery} from "./queries/get-one-question/get-one-question.query";
import {UpdateQuestionCommand} from "./commands/update-question/update-question.command";
import {UpdateQuestionResponse} from "./commands/update-question/update-question.response";
import {DeleteQuestionCommand} from "./commands/delete-question/delete-question.command";

@ApiTags('Question')
@Controller('admin/question')
export class QuestionController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

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

  @Post()
  @ApiOkResponse({type: CreateQuestionResponse})
  async create(@Body() payload: CreateQuestionRequest) {
    const cmd = new CreateQuestionCommand(payload.fullName, payload.phoneNumber, payload.question, payload.status);
    return await this.commandBus.execute(cmd);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateQuestionResponse })
  async updateQuestion(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateQuestionRequest
  ) {
    const cmd = new UpdateQuestionCommand(payload.fullName, payload.phoneNumber, payload.question, payload.status);
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Delete(':id')
  @ApiOkResponse()
  async deleteQuestion(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteQuestionCommand();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}
