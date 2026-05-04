import {Query} from "@nestjs/cqrs";
import {GetOneNewsResponse} from "@/features/news/news/queries/get-one-news/get-one-news.response";

export class GetOneNewsQuery extends Query<GetOneNewsResponse> {
  constructor(public readonly id: number) {
    super();
  }
}
