import {Command} from "@nestjs/cqrs";
import {UpdateApplicationResponse} from "./update-application.response";

export class UpdateApplicationCommand extends Command<UpdateApplicationResponse> {
  public id!: number;

  constructor(
    public fullName?: string,
    public email?: string,
    public phoneNumber?: string,
  ) {
    super();
  }
}
