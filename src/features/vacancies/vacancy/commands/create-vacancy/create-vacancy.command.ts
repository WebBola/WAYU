import {Command} from "@nestjs/cqrs";
import {CreateVacancyResponse} from "./create-vacancy.response";

export class CreateVacancyCommand extends Command<CreateVacancyResponse> {
  constructor(
    public title: string,
    public address: string,
    public description: string,
    public phoneNumber: string,
    public type: string,
    public salary: string,
    public isActive: boolean,
  ) {
    super();
  }
}
