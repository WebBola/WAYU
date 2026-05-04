import {Query} from "@nestjs/cqrs";
import {GetOneVacancyResponse} from "./get-one-vacancy.response";

export class GetOneVacancyQuery extends Query<GetOneVacancyResponse> {
  constructor(public readonly id: number) {
    super();
  }
}
