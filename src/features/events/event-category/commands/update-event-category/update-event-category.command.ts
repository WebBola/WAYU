import {Command} from "@nestjs/cqrs";
import {UpdateEventCategoryResponse} from "./update-event-category.response";

export class UpdateEventCategoryCommand extends Command<UpdateEventCategoryResponse> {
  public id!: number;

  constructor(
    public title?: string,
  ) {
    super();
  }
}
