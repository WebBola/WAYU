import {Command} from "@nestjs/cqrs";
import {UpdateNewsCategoryResponse} from "./update-news-category.response";

export class UpdateNewsCategoryCommand extends Command<UpdateNewsCategoryResponse> {
  public id!: number;

  constructor(
    public name?: string,
  ) {
    super();
  }
}
