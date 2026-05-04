import {Command} from "@nestjs/cqrs";
import {UpdateQuestionResponse} from "./update-question.response";

export class UpdateQuestionCommand extends Command<UpdateQuestionResponse> {
  public id!: number;

  constructor(
    public fullName?: string,
    public phoneNumber?: string,
    public question?: string,
    public status?: string,
  ) {
    super();
  }
}
