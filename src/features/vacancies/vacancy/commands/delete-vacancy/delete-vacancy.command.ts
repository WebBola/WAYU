import {Command} from "@nestjs/cqrs";

export class DeleteVacancyCommand extends Command<void> {
  public id!: number;
}
