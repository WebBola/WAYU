import {Command} from "@nestjs/cqrs";

export class DeleteBookCategoryCommand extends Command<void> {
  public id!: number;
}
