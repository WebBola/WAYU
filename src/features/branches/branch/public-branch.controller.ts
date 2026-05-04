import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { GetAllBranchesResponse } from "./queries/get-all-branches/get-all-branches.response";
import { GetAllBranchesFilters } from "./queries/get-all-branches/get-all-branches.filters";
import { GetAllBranchesQuery } from "./queries/get-all-branches/get-all-branches.query";
import { GetOneBranchResponse } from "./queries/get-one-branch/get-one-branch.response";
import { GetOneBranchQuery } from "./queries/get-one-branch/get-one-branch.query";

@ApiTags('Public Branches')
@Controller('public/branches')
export class PublicBranchController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetAllBranchesResponse] })
  async getAllBranches(@Query() filters: GetAllBranchesFilters) {
    return await this.queryBus.execute(new GetAllBranchesQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneBranchResponse })
  async getOneBranch(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneBranchQuery(id));
  }
}
