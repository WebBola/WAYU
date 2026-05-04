import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetAllQuestionsQuery} from "./get-all-questions.query";
import {GetAllQuestionsResponse} from "./get-all-questions.response";
import {Question} from "@/features/questions/question/question.entity";
import {plainToInstance} from "class-transformer";

@QueryHandler(GetAllQuestionsQuery)
export class GetAllQuestionsHandler implements IQueryHandler<GetAllQuestionsQuery> {
  async execute(query: GetAllQuestionsQuery): Promise<GetAllQuestionsResponse[]> {
    const where: any = {};
    if (query.filters.status) {
      where.status = query.filters.status;
    }

    const questions = await Question.find({
      where,
      order: {createdAt: 'DESC'}
    });

    return plainToInstance(GetAllQuestionsResponse, questions, {excludeExtraneousValues: true});
  }
}
