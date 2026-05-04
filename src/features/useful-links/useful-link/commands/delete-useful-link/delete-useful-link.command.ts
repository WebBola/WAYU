import {Command} from "@nestjs/cqrs";

export class DeleteUsefulLinkCommand extends Command<void> {
  public id!: number;
}
