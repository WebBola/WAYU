import {Command} from "@nestjs/cqrs";

export class DeleteBranchCommand extends Command<void> {
  public id!: number;
}
