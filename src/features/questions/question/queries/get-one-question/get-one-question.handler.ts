import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetOneQuestionQuery} from "./get-one-question.query";
import {GetOneQuestionResponse} from "./get-one-question.response";
import {Question} from "@/features/questions/question/question.entity";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";

@QueryHandler(GetOneQuestionQuery)
export class GetOneQuestionHandler implements IQueryHandler<GetOneQuestionQuery> {
  async execute(query: GetOneQuestionQuery): Promise<GetOneQuestionResponse> {
    const question = await Question.findOne({ where: { id: query.id } });

    if (!question) {
      throw new NotFoundException("Question not found");
    }

    return plainToInstance(GetOneQuestionResponse, question, {excludeExtraneousValues: true});
  }
}
