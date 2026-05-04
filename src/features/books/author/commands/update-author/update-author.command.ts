import {Command} from "@nestjs/cqrs";
import {UpdateAuthorResponse} from "./update-author.response";

export class UpdateAuthorCommand extends Command<UpdateAuthorResponse> {
  public id!: number;

  constructor(
    public fullName?: string,
  ) {
    super();
  }
}
