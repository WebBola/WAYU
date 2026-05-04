import {Command} from "@nestjs/cqrs";
import {UpdateBookCategoryResponse} from "./update-book-category.response";

export class UpdateBookCategoryCommand extends Command<UpdateBookCategoryResponse> {
  public id!: number;

  constructor(
    public name?: string,
  ) {
    super();
  }
}
