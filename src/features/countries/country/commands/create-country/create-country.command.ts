import { Command } from "@nestjs/cqrs";
import { CreateCountryResponse } from "./create-country.response";

export class CreateCountryCommand extends Command<CreateCountryResponse> {
  constructor(
    public readonly title: string,
    public readonly flag: Express.Multer.File,
  ) {
    super();
  }
}