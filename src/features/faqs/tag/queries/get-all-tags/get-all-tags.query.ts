import {Query} from "@nestjs/cqrs";
import {GetAllTagsResponse} from "./get-all-tags.response";
import {GetAllTagsFilters} from "./get-all-tags.filters";

export class GetAllTagsQuery extends Query<GetAllTagsResponse[]> {
  constructor(public readonly filters: GetAllTagsFilters) {
    super();
  }
}
