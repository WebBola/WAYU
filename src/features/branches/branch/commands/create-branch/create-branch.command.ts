import {Command} from "@nestjs/cqrs";
import {CreateBranchResponse} from "./create-branch.response";

export class CreateBranchCommand extends Command<CreateBranchResponse> {
    constructor(
      public countryId: number, 
      public representativeId: number, 
      public city: string, 
      public latitude: number, 
      public longitude: number, 
      public phoneNumber: string
    ) {
        super();
    }
}
