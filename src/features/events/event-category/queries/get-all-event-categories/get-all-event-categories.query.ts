import {Query} from "@nestjs/cqrs";
import {GetAllEventCategoriesResponse} from "./get-all-event-categories.response";
import {GetAllEventCategoriesFilters} from "./get-all-event-categories.filters";

export class GetAllEventCategoriesQuery extends Query<GetAllEventCategoriesResponse[]> {
  constructor(public readonly filters: GetAllEventCategoriesFilters) {
    super();
  }
}
