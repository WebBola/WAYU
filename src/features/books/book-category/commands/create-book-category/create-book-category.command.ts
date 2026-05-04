import {Command} from "@nestjs/cqrs";
import {CreateBookCategoryResponse} from "./create-book-category.response";

export class CreateBookCategoryCommand extends Command<CreateBookCategoryResponse> {
  constructor(
    public name: string,
  ) {
    super();
  }
}
