import {Command} from "@nestjs/cqrs";

export class DeleteAuthorCommand extends Command<void> {
  public id!: number;
}
