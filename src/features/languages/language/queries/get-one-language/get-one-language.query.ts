import {Query} from "@nestjs/cqrs";
import {GetOneLanguageResponse} from "./get-one-language.response";

export class GetOneLanguageQuery extends Query<GetOneLanguageResponse> {
  constructor(public readonly id: number) {
    super();
  }
}
