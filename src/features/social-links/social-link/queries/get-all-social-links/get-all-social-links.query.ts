import {Query} from "@nestjs/cqrs";
import {GetAllSocialLinksResponse} from "./get-all-social-links.response";

export class GetAllSocialLinksQuery extends Query<GetAllSocialLinksResponse[]> {
  constructor() {
    super();
  }
}
