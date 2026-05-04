import {Command} from "@nestjs/cqrs";
import {UpdateVacancyResponse} from "./update-vacancy.response";

export class UpdateVacancyCommand extends Command<UpdateVacancyResponse> {
  public id!: number;

  constructor(
    public title?: string,
    public address?: string,
    public description?: string,
    public phoneNumber?: string,
    public type?: string,
    public salary?: string,
    public isActive?: boolean,
  ) {
    super();
  }
}
