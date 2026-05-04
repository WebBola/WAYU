import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetOneBranchQuery} from "./get-one-branch.query";
import {GetOneBranchResponse} from "./get-one-branch.response";
import {Branch} from "@/features/branches/branch/branch.entity";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";

@QueryHandler(GetOneBranchQuery)
export class GetOneBranchHandler implements IQueryHandler<GetOneBranchQuery> {
  async execute(query: GetOneBranchQuery): Promise<GetOneBranchResponse> {
    const branch = await Branch.findOne({
      where: { id: query.id },
      relations: ['country', 'representative']
    });

    if (!branch) {
      throw new NotFoundException("Branch not found");
    }

    return plainToInstance(GetOneBranchResponse, branch, {excludeExtraneousValues: true});
  }
}
