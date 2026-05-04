import {Query} from "@nestjs/cqrs";
import {GetAllBooksResponse} from "./get-all-books.response";
import {GetAllBooksFilters} from "./get-all-books.filters";

export class GetAllBooksQuery extends Query<GetAllBooksResponse[]> {
  constructor(public readonly filters: GetAllBooksFilters) {
    super();
  }
}
