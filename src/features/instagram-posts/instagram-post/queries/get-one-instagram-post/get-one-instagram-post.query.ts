import {Query} from "@nestjs/cqrs";
import {GetOneInstagramPostResponse} from "./get-one-instagram-post.response";

export class GetOneInstagramPostQuery extends Query<GetOneInstagramPostResponse> {
  constructor(public readonly id: number) {
    super();
  }
}
