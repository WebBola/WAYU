import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiConsumes, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import fs from 'fs';
import {storageOptions} from "@/configs/multer.config";

import {CreateStaticInfoRequest} from "./commands/create-static-info/create-static-info.request";
import {CreateStaticInfoCommand} from "./commands/create-static-info/create-static-info.command";
import {CreateStaticInfoResponse} from "./commands/create-static-info/create-static-info.response";

@ApiTags('StaticInfo')
@Controller('admin/static-info')
export class StaticInfoController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOkResponse({ type: [CreateStaticInfoResponse] })
  async getAllStaticInfo() {
    return await this.queryBus.execute({});
  }

  @Get(':id')
  @ApiOkResponse({ type: CreateStaticInfoResponse })
  async getOneStaticInfo(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute({}); 
  }

  @Post()
  @ApiOkResponse({type: CreateStaticInfoResponse})
  async create(@Body() payload: CreateStaticInfoRequest) {
    const cmd = new CreateStaticInfoCommand(payload.appStoreLink, payload.playMarketLink, payload.aboutUs);
    return await this.commandBus.execute(cmd);
  }

  @Patch(':id')
  @ApiOkResponse({ type: CreateStaticInfoResponse })
  async updateStaticInfo(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateStaticInfoRequest
  ) {
    const cmd = new CreateStaticInfoCommand(payload.appStoreLink, payload.playMarketLink, payload.aboutUs);
    return await this.commandBus.execute(cmd);
  }

  @Delete(':id')
  @ApiOkResponse()
  async deleteStaticInfo(@Param('id', ParseIntPipe) id: number) {
    return await this.commandBus.execute({});
  }
}
