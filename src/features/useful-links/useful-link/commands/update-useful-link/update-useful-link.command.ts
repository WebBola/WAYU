import {Command} from "@nestjs/cqrs";
import {UpdateUsefulLinkResponse} from "./update-useful-link.response";

export class UpdateUsefulLinkCommand extends Command<UpdateUsefulLinkResponse> {
  public id!: number;

  constructor(
    public title?: string,
    public icon?: string,
    public link?: string,
  ) {
    super();
  }
}
