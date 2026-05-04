import {Command} from "@nestjs/cqrs";

export class DeleteNewsCommand extends Command<void> {
  public id!: number;
}
