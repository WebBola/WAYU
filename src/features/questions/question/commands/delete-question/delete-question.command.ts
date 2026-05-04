import {Command} from "@nestjs/cqrs";

export class DeleteQuestionCommand extends Command<void> {
  public id!: number;
}
