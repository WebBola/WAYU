import {Command} from "@nestjs/cqrs";

export class DeleteSocialLinkCommand extends Command<void> {
  public id!: number;
}
