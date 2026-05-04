import {Command} from "@nestjs/cqrs";
import {UpdateRepresentativeResponse} from "./update-representative.response";

export class UpdateRepresentativeCommand extends Command<UpdateRepresentativeResponse> {
  public id!: number;

  constructor(
    public fullName?: string,
    public phoneNumber?: string,
  ) {
    super();
  }
}
