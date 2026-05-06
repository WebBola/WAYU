import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {CreateBranchRequest} from "./commands/create-branch/create-branch.request";
import {CreateBranchCommand} from "./commands/create-branch/create-branch.command";
import {CreateBranchResponse} from "./commands/create-branch/create-branch.response";
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";
import { GetAllBranchesResponse } from "./queries/get-all-branches/get-all-branches.response";
import { GetAllBranchesFilters } from "./queries/get-all-branches/get-all-branches.filters";
import { GetAllBranchesQuery } from "./queries/get-all-branches/get-all-branches.query";
import { GetOneBranchResponse } from "./queries/get-one-branch/get-one-branch.response";
import { GetOneBranchQuery } from "./queries/get-one-branch/get-one-branch.query";
import { UpdateBranchRequest } from "./commands/update-branch/update-branch.request";
import { UpdateBranchCommand } from "./commands/update-branch/update-branch.command";
import { UpdateBranchResponse } from "./commands/update-branch/update-branch.response";
import { DeleteBranchCommand } from "./commands/delete-branch/delete-branch.command";

@ApiTags('Branches')
@Controller('admin/branches')
export class BranchController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @Post()
  @ApiOkResponse({ type: CreateBranchResponse })
  async createBranch(@Body() payload: CreateBranchRequest) {
    const cmd = new CreateBranchCommand(
      payload.countryId, 
      payload.representativeId, 
      payload.city, 
      payload.latitude, 
      payload.longitude, 
      payload.phoneNumber
    );
    return await this.commandBus.execute(cmd);
  }

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

  @Patch(':id')
  @ApiOkResponse({ type: UpdateBranchResponse })
  async updateBranch(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBranchRequest
  ) {
    const cmd = new UpdateBranchCommand(
      payload.countryId,
      payload.representativeId,
      payload.city,
      payload.latitude,
      payload.longitude,
      payload.phoneNumber
    );
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Delete(':id')
  @ApiOkResponse()
  async deleteBranch(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteBranchCommand();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}
