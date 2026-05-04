import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiConsumes, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import fs from 'fs';
import {storageOptions} from "@/configs/multer.config";

import {CreateUsefulLinkRequest} from "./commands/create-useful-link/create-useful-link.request";
import {CreateUsefulLinkCommand} from "./commands/create-useful-link/create-useful-link.command";
import {CreateUsefulLinkResponse} from "./commands/create-useful-link/create-useful-link.response";
import {GetAllUsefulLinksResponse} from "./queries/get-all-useful-links/get-all-useful-links.response";
import {GetAllUsefulLinksQuery} from "./queries/get-all-useful-links/get-all-useful-links.query";
import {GetOneUsefulLinkResponse} from "./queries/get-one-useful-link/get-one-useful-link.response";
import {GetOneUsefulLinkQuery} from "./queries/get-one-useful-link/get-one-useful-link.query";
import {UpdateUsefulLinkCommand} from "./commands/update-useful-link/update-useful-link.command";
import {UpdateUsefulLinkResponse} from "./commands/update-useful-link/update-useful-link.response";
import {DeleteUsefulLinkCommand} from "./commands/delete-useful-link/delete-useful-link.command";

@ApiTags('UsefulLink')
@Controller('admin/useful-link')
export class UsefulLinkController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOkResponse({ type: [GetAllUsefulLinksResponse] })
  async getAllUsefulLinks() {
    return await this.queryBus.execute(new GetAllUsefulLinksQuery());
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneUsefulLinkResponse })
  async getOneUsefulLink(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneUsefulLinkQuery(id));
  }

  @Post()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor('icon', {storage: storageOptions, limits: {fileSize: 1024 * 1024 * 5}}))
  async create(@Body() payload: CreateUsefulLinkRequest, @UploadedFile() icon: Express.Multer.File) {
    const cmd = new CreateUsefulLinkCommand(payload.title, payload.link, icon);
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (icon && fs.existsSync(icon.path)) fs.rmSync(icon.path);
      throw exc;
    }
  }

  @Patch(':id')
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor('icon', {storage: storageOptions, limits: {fileSize: 1024 * 1024 * 5}}))
  async updateUsefulLink(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateUsefulLinkRequest,
    @UploadedFile() icon?: Express.Multer.File
  ) {
    const cmd = new UpdateUsefulLinkCommand(payload.title, payload.link, icon?.path);
    cmd.id = id;
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (icon && fs.existsSync(icon.path)) fs.rmSync(icon.path);
      throw exc;
    }
  }

  @Delete(':id')
  @ApiOkResponse()
  async deleteUsefulLink(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteUsefulLinkCommand();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}
