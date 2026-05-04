import {Command} from "@nestjs/cqrs";
import {UpdateTagResponse} from "./update-tag.response";

export class UpdateTagCommand extends Command<UpdateTagResponse> {
  public id!: number;

  constructor(
    public title?: string,
  ) {
    super();
  }
}
