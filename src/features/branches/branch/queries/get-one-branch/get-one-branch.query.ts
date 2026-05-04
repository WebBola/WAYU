import {Query} from "@nestjs/cqrs";
import {GetOneBranchResponse} from "./get-one-branch.response";

export class GetOneBranchQuery extends Query<GetOneBranchResponse> {
  constructor(public readonly id: number) {
    super();
  }
}
