import {Query} from "@nestjs/cqrs";
import {GetOneEventCategoryResponse} from "./get-one-event-category.response";

export class GetOneEventCategoryQuery extends Query<GetOneEventCategoryResponse> {
  constructor(public readonly id: number) {
    super();
  }
}
