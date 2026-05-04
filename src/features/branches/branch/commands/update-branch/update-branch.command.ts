import {Command} from "@nestjs/cqrs";
import {UpdateBranchResponse} from "./update-branch.response";

export class UpdateBranchCommand extends Command<UpdateBranchResponse> {
  public id!: number;

  constructor(
    public countryId?: number,
    public representativeId?: number,
    public city?: string,
    public latitude?: number,
    public longitude?: number,
    public phoneNumber?: string,
  ) {
    super();
  }
}
