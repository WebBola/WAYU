import {Query} from "@nestjs/cqrs";
import {GetAllBookCategoriesResponse} from "./get-all-book-categories.response";
import {GetAllBookCategoriesFilters} from "./get-all-book-categories.filters";

export class GetAllBookCategoriesQuery extends Query<GetAllBookCategoriesResponse[]> {
  constructor(public readonly filters: GetAllBookCategoriesFilters) {
    super();
  }
}
