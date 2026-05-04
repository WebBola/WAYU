import {Command} from "@nestjs/cqrs";
import {UpdateCountryResponse} from "./update-country.response";

export class UpdateCountryCommand extends Command<UpdateCountryResponse> {
  public id!: number;

  constructor(
    public name?: string,
  ) {
    super();
  }
}
