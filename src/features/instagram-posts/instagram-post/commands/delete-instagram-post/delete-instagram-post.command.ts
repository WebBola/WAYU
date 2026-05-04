import {Command} from "@nestjs/cqrs";

export class DeleteInstagramPostCommand extends Command<void> {
  public id!: number;
}
