import {Command} from "@nestjs/cqrs";

export class DeleteApplicationCommand extends Command<void> {
  public id!: number;
}
