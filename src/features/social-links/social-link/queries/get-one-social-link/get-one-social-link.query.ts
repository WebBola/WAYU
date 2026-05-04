import {Query} from "@nestjs/cqrs";
import {GetOneSocialLinkResponse} from "./get-one-social-link.response";

export class GetOneSocialLinkQuery extends Query<GetOneSocialLinkResponse> {
  constructor(public readonly id: number) {
    super();
  }
}
