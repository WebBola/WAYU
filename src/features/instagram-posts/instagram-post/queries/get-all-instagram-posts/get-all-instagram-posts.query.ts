import {Query} from "@nestjs/cqrs";
import {GetAllInstagramPostsResponse} from "./get-all-instagram-posts.response";

export class GetAllInstagramPostsQuery extends Query<GetAllInstagramPostsResponse[]> {
  constructor() {
    super();
  }
}
