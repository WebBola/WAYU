import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";

import {CreateTagRequest} from "./commands/create-tag/create-tag.request";
import {CreateTagCommand} from "./commands/create-tag/create-tag.command";
import {CreateTagResponse} from "./commands/create-tag/create-tag.response";
import {GetAllTagsResponse} from "./queries/get-all-tags/get-all-tags.response";
import {GetAllTagsQuery} from "./queries/get-all-tags/get-all-tags.query";
import {GetAllTagsFilters} from "./queries/get-all-tags/get-all-tags.filters";
import {GetOneTagResponse} from "./queries/get-one-tag/get-one-tag.response";
import {GetOneTagQuery} from "./queries/get-one-tag/get-one-tag.query";
import {UpdateTagRequest} from "./commands/update-tag/update-tag.request";
import {UpdateTagCommand} from "./commands/update-tag/update-tag.command";
import {UpdateTagResponse} from "./commands/update-tag/update-tag.response";
import {DeleteTagCommand} from "./commands/delete-tag/delete-tag.command";

@ApiTags('Tags')
@Controller('admin/tag')
export class TagController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({type: [GetAllTagsResponse]})
  async getAllTags(@Query() filters: GetAllTagsFilters) {
    return await this.queryBus.execute(new GetAllTagsQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneTagResponse })
  async getOneTag(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneTagQuery(id));
  }

  @Post()
  @ApiOkResponse({type: CreateTagResponse})
  async createTag(@Body() payload: CreateTagRequest) {
    const command = new CreateTagCommand(payload.title);
    return await this.commandBus.execute(command);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateTagResponse })
  async updateTag(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateTagRequest
  ) {
    const cmd = new UpdateTagCommand(payload.title);
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Delete(':id')
  @ApiOkResponse()
  async deleteTag(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteTagCommand();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}
