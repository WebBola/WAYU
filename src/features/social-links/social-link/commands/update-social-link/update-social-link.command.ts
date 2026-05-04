import {Command} from "@nestjs/cqrs";
import {UpdateSocialLinkResponse} from "./update-social-link.response";

export class UpdateSocialLinkCommand extends Command<UpdateSocialLinkResponse> {
  public id!: number;

  constructor(
    public title?: string,
    public icon?: string,
    public link?: string,
  ) {
    super();
  }
}
