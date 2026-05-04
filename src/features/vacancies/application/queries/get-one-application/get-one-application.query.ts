import {Query} from "@nestjs/cqrs";
import {GetOneApplicationResponse} from "./get-one-application.response";

export class GetOneApplicationQuery extends Query<GetOneApplicationResponse> {
  constructor(public readonly id: number) {
    super();
  }
}
