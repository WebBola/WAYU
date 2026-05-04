import {Command} from "@nestjs/cqrs";
import {CreateRepresentativeResponse} from "./create-representative.response";

export class CreateRepresentativeCommand extends Command<CreateRepresentativeResponse> {
  constructor(
    public fullName: string,
    public image: string,
    public email: string,
    public phoneNumber: string,
    public resume: string,
  ) {
    super();
  }
}
