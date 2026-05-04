import {Query} from "@nestjs/cqrs";
import {GetAllEventsResponse} from "./get-all-events.response";
import {GetAllEventsFilters} from "./get-all-events.filters";

export class GetAllEventsQuery extends Query<GetAllEventsResponse[]> {
  constructor(public readonly filters: GetAllEventsFilters) {
    super();
  }
}
