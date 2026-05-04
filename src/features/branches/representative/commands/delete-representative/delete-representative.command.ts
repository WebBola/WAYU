import {Command} from "@nestjs/cqrs";

export class DeleteRepresentativeCommand extends Command<void> {
  public id!: number;
}
