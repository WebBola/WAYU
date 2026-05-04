import {Query} from "@nestjs/cqrs";
import {GetOneTagResponse} from "./get-one-tag.response";

export class GetOneTagQuery extends Query<GetOneTagResponse> {
  constructor(public readonly id: number) {
    super();
  }
}
