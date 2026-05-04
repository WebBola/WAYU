import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {CreateNewsRequest} from "./commands/create-news/create-news.request";
import {FileInterceptor} from "@nestjs/platform-express";
import {CreateNewsCommand} from "./commands/create-news/create-news.command";
import {ApiConsumes, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {storageOptions} from "@/configs/multer.config";
import fs from 'fs';
import { GetAllNewsResponse } from "./queries/get-all-news/get-all-news.response";
import { GetAllNewsFilters } from "./queries/get-all-news/get-all-news.filters";
import { GetAllNewsQuery } from "./queries/get-all-news/get-all-news.query";
import { GetOneNewsResponse } from "./queries/get-one-news/get-one-news.response";
import { GetOneNewsQuery } from "./queries/get-one-news/get-one-news.query";
import { UpdateNewsRequest } from "./commands/update-news/update-news.request";
import { UpdateNewsCommand } from "./commands/update-news/update-news.command";
import { UpdateNewsResponse } from "./commands/update-news/update-news.response";
import { DeleteNewsCommand } from "./commands/delete-news/delete-news.command";



@ApiTags('News')
@Controller('admin/news')
export class NewsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @Post()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor('image', {storage: storageOptions, limits: {fileSize: 1024 * 1024 * 5}}))
  async createNews(@Body() payload: CreateNewsRequest, @UploadedFile() image: Express.Multer.File) {
    let cmd = new CreateNewsCommand(payload.categoryId, payload.countryId || null, payload.title, image, payload.date, payload.content);
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (fs.existsSync(image.path))
        fs.rmSync(image.path);
      throw exc;
    }
  }

  @Get()
  @ApiOkResponse({ type: [GetAllNewsResponse] })
  async getAllNews(@Query() filters: GetAllNewsFilters) {
    return await this.queryBus.execute(new GetAllNewsQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneNewsResponse })
  async getOneNews(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneNewsQuery(id));
  }

  @Patch(':id')
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor('image', {storage: storageOptions, limits: {fileSize: 1024 * 1024 * 5}}))
  @ApiOkResponse({ type: UpdateNewsResponse })
  async updateNews(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateNewsRequest,
    @UploadedFile() image?: Express.Multer.File
  ) {
    const cmd = new UpdateNewsCommand(payload.categoryId, payload.countryId, payload.title, image, payload.date, payload.content);
    cmd.id = id;
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (image && fs.existsSync(image.path))
        fs.rmSync(image.path);
      throw exc;
    }
  }

  @Delete(':id')
  @ApiOkResponse()
  async deleteNews(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteNewsCommand();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}