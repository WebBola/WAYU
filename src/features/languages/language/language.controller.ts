import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateLanguageCommand } from './commands/create-language/create-language.command';
import { CreateLanguageResponse } from './commands/create-language/create-language.response';
import { CreateLanguageRequest } from './commands/create-language/create-language.request';
import { UpdateLanguageCommand } from './commands/update-language/update-language.command';
import { UpdateLanguageResponse } from './commands/update-language/update-language.response';
import { UpdateLanguageRequest } from './commands/update-language/update-language.request';
import { DeleteLanguageCommand } from './commands/delete-language/delete-language.command';
import { GetAllLanguagesQuery } from './queries/get-all-languages/get-all-languages.query';
import { GetAllLanguagesResponse } from './queries/get-all-languages/get-all-languages.response';
import { GetOneLanguageQuery } from './queries/get-one-language/get-one-language.query';
import { GetOneLanguageResponse } from './queries/get-one-language/get-one-language.response';
import { GetAllLanguagesFilters } from './queries/get-all-languages/get-all-languages.filters';

@ApiTags('Languages')
@Controller('admin/language')
export class LanguageController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queriesBus: QueryBus,
  ) { }

  @Get()
  @ApiOkResponse({ type: [GetAllLanguagesResponse] })
  async getAllLanguages(@Query() filters: GetAllLanguagesFilters) {
    return await this.queriesBus.execute(new GetAllLanguagesQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneLanguageResponse })
  async getOneLanguage(@Param('id', ParseIntPipe) id: number) {
    return await this.queriesBus.execute(new GetOneLanguageQuery(id));
  }

  @Post()
  @ApiOkResponse({ type: CreateLanguageResponse })
  async createLanguage(@Body() payload: CreateLanguageRequest) {
    const command = new CreateLanguageCommand(payload.title);
    return await this.commandBus.execute(command);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateLanguageResponse })
  async updateLanguage(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateLanguageRequest,
  ) {
    const command = new UpdateLanguageCommand(payload.title);
    command.id = id;
    return await this.commandBus.execute(command);
  }

  @Delete(':id')
  @ApiOkResponse()
  async deleteLanguage(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteLanguageCommand();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}
