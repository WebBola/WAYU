import {Command} from "@nestjs/cqrs";
import {CreateApplicationResponse} from "./create-application.response";

export class CreateApplicationCommand extends Command<CreateApplicationResponse> {
  constructor(
    public fullName: string,
    public phoneNumber: string,
    public email: string,
    public vacancyId: number,
    public resume: string,
    public status: string,
  ) {
    super();
  }
}
