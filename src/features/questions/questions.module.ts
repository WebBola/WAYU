import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { QuestionController } from './question/question.controller';
import { PublicQuestionController } from './question/public-question.controller';
import { CreateQuestionHandler } from './question/commands/create-question/create-question.handler';
import { UpdateQuestionHandler } from './question/commands/update-question/update-question.handler';
import { DeleteQuestionHandler } from './question/commands/delete-question/delete-question.handler';
import { GetAllQuestionsHandler } from './question/queries/get-all-questions/get-all-questions.handler';
import { GetOneQuestionHandler } from './question/queries/get-one-question/get-one-question.handler';

@Module({
  imports: [CqrsModule],
  controllers: [QuestionController, PublicQuestionController],
  providers: [
    CreateQuestionHandler,
    UpdateQuestionHandler,
    DeleteQuestionHandler,
    GetAllQuestionsHandler,
    GetOneQuestionHandler,
  ],
})
export class QuestionsModule {}
