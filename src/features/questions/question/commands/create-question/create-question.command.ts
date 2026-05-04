import {Command} from "@nestjs/cqrs";
import {CreateQuestionResponse} from "./create-question.response";
import {QuestionStatus} from "@/core/enum/enum";

export class CreateQuestionCommand extends Command<CreateQuestionResponse> {
  constructor(
    public readonly fullName: string,
    public readonly phoneNumber: string,
    public readonly question: string,
    public readonly status: QuestionStatus,
  ) {
    super();
  }
}
