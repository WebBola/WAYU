import {Query} from "@nestjs/cqrs";
import {GetOneRepresentativeResponse} from "./get-one-representative.response";

export class GetOneRepresentativeQuery extends Query<GetOneRepresentativeResponse> {
  constructor(public readonly id: number) {
    super();
  }
}
