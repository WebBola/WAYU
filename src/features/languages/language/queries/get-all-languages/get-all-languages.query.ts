import {Query} from "@nestjs/cqrs";
import {GetAllLanguagesResponse} from "./get-all-languages.response";
import {GetAllLanguagesFilters} from "./get-all-languages.filters";

export class GetAllLanguagesQuery extends Query<GetAllLanguagesResponse[]> {
  constructor(public readonly filters: GetAllLanguagesFilters) {
    super();
  }
}
