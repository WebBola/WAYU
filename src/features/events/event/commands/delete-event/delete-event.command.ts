import {Command} from "@nestjs/cqrs";

export class DeleteEventCommand extends Command<void> {
  public id!: number;
}
