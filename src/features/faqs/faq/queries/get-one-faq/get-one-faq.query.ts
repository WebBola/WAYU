import {Query} from "@nestjs/cqrs";
import {GetOneFaqResponse} from "./get-one-faq.response";

export class GetOneFaqQuery extends Query<GetOneFaqResponse> {
  constructor(public readonly id: number) {
    super();
  }
}
