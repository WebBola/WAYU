import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiConsumes, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import fs from 'fs';
import {storageOptions} from "@/configs/multer.config";

import {CreateSocialLinkRequest} from "./commands/create-social-link/create-social-link.request";
import {CreateSocialLinkCommand} from "./commands/create-social-link/create-social-link.command";
import {CreateSocialLinkResponse} from "./commands/create-social-link/create-social-link.response";
import {GetAllSocialLinksResponse} from "./queries/get-all-social-links/get-all-social-links.response";
import {GetAllSocialLinksQuery} from "./queries/get-all-social-links/get-all-social-links.query";
import {GetOneSocialLinkResponse} from "./queries/get-one-social-link/get-one-social-link.response";
import {GetOneSocialLinkQuery} from "./queries/get-one-social-link/get-one-social-link.query";
import {UpdateSocialLinkCommand} from "./commands/update-social-link/update-social-link.command";
import {UpdateSocialLinkResponse} from "./commands/update-social-link/update-social-link.response";
import {DeleteSocialLinkCommand} from "./commands/delete-social-link/delete-social-link.command";

@ApiTags('SocialLink')
@Controller('admin/social-link')
export class SocialLinkController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOkResponse({ type: [GetAllSocialLinksResponse] })
  async getAllSocialLinks() {
    return await this.queryBus.execute(new GetAllSocialLinksQuery());
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneSocialLinkResponse })
  async getOneSocialLink(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneSocialLinkQuery(id));
  }

  @Post()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor('icon', {storage: storageOptions, limits: {fileSize: 1024 * 1024 * 5}}))
  async create(@Body() payload: CreateSocialLinkRequest, @UploadedFile() icon: Express.Multer.File) {
    const cmd = new CreateSocialLinkCommand(payload.title, payload.link, icon);
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
  async updateSocialLink(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateSocialLinkRequest,
    @UploadedFile() icon?: Express.Multer.File
  ) {
    const cmd = new UpdateSocialLinkCommand(payload.title, payload.link, icon?.path);
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
  async deleteSocialLink(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteSocialLinkCommand();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}
