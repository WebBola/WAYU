import {Query} from "@nestjs/cqrs";
import {GetOneQuestionResponse} from "./get-one-question.response";

export class GetOneQuestionQuery extends Query<GetOneQuestionResponse> {
  constructor(public readonly id: number) {
    super();
  }
}
