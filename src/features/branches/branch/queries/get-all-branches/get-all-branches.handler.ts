import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetAllBranchesQuery} from "./get-all-branches.query";
import {GetAllBranchesResponse} from "./get-all-branches.response";
import {Branch} from "@/features/branches/branch/branch.entity";
import {plainToInstance} from "class-transformer";

@QueryHandler(GetAllBranchesQuery)
export class GetAllBranchesHandler implements IQueryHandler<GetAllBranchesQuery> {
  async execute(query: GetAllBranchesQuery): Promise<GetAllBranchesResponse[]> {
    const where: any = {};
    if (query.filters.countryId) {
      where.countryId = query.filters.countryId;
    }
    if (query.filters.representativeId) {
      where.representativeId = query.filters.representativeId;
    }

    const branches = await Branch.find({
      where,
      order: {createdAt: 'DESC'},
      relations: ['country', 'representative']
    });

    return plainToInstance(GetAllBranchesResponse, branches, {excludeExtraneousValues: true});
  }
}
