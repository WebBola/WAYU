import {Query} from "@nestjs/cqrs";
import {GetAllUsefulLinksResponse} from "./get-all-useful-links.response";

export class GetAllUsefulLinksQuery extends Query<GetAllUsefulLinksResponse[]> {
  constructor() {
    super();
  }
}
