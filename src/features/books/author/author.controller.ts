import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";

import {CreateAuthorRequest} from "./commands/create-author/create-author.request";
import {CreateAuthorCommand} from "./commands/create-author/create-author.command";
import {CreateAuthorResponse} from "./commands/create-author/create-author.response";
import {GetAllAuthorsResponse} from "./queries/get-all-authors/get-all-authors.response";
import {GetAllAuthorsQuery} from "./queries/get-all-authors/get-all-authors.query";
import {GetAllAuthorsFilters} from "./queries/get-all-authors/get-all-authors.filters";
import {GetOneAuthorResponse} from "./queries/get-one-author/get-one-author.response";
import {GetOneAuthorQuery} from "./queries/get-one-author/get-one-author.query";
import {UpdateAuthorRequest} from "./commands/update-author/update-author.request";
import {UpdateAuthorCommand} from "./commands/update-author/update-author.command";
import {UpdateAuthorResponse} from "./commands/update-author/update-author.response";
import {DeleteAuthorCommand} from "./commands/delete-author/delete-author.command";

@ApiTags('Authors')
@Controller('admin/author')
export class AuthorController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({type: [GetAllAuthorsResponse]})
  async getAllAuthors(@Query() filters: GetAllAuthorsFilters) {
    return await this.queryBus.execute(new GetAllAuthorsQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneAuthorResponse })
  async getOneAuthor(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneAuthorQuery(id));
  }

  @Post()
  @ApiOkResponse({type: CreateAuthorResponse})
  async createAuthor(@Body() payload: CreateAuthorRequest) {
    const command = new CreateAuthorCommand(payload.fullName)
    return await this.commandBus.execute(command);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateAuthorResponse })
  async updateAuthor(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateAuthorRequest
  ) {
    const cmd = new UpdateAuthorCommand(payload.fullName);
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Delete(':id')
  @ApiOkResponse()
  async deleteAuthor(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteAuthorCommand();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}
