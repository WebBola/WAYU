import {Command} from "@nestjs/cqrs";

export class DeleteCountryCommand extends Command<void> {
  public id!: number;
}
