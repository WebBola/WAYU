import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiConsumes, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import fs from 'fs';
import {storageOptions} from "@/configs/multer.config";

import {CreateInstagramPostRequest} from "./commands/create-instagram-post/create-instagram-post.request";
import {CreateInstagramPostCommand} from "./commands/create-instagram-post/create-instagram-post.command";
import {CreateInstagramPostResponse} from "./commands/create-instagram-post/create-instagram-post.response";
import {GetAllInstagramPostsResponse} from "./queries/get-all-instagram-posts/get-all-instagram-posts.response";
import {GetAllInstagramPostsQuery} from "./queries/get-all-instagram-posts/get-all-instagram-posts.query";
import {GetOneInstagramPostResponse} from "./queries/get-one-instagram-post/get-one-instagram-post.response";
import {GetOneInstagramPostQuery} from "./queries/get-one-instagram-post/get-one-instagram-post.query";
import {UpdateInstagramPostCommand} from "./commands/update-instagram-post/update-instagram-post.command";
import {UpdateInstagramPostResponse} from "./commands/update-instagram-post/update-instagram-post.response";
import {DeleteInstagramPostCommand} from "./commands/delete-instagram-post/delete-instagram-post.command";

@ApiTags('InstagramPost')
@Controller('admin/instagram-post')
export class InstagramPostController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOkResponse({ type: [GetAllInstagramPostsResponse] })
  async getAllInstagramPosts() {
    return await this.queryBus.execute(new GetAllInstagramPostsQuery());
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneInstagramPostResponse })
  async getOneInstagramPost(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneInstagramPostQuery(id));
  }

  @Post()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor('image', {storage: storageOptions, limits: {fileSize: 1024 * 1024 * 5}}))
  async create(@Body() payload: CreateInstagramPostRequest, @UploadedFile() image: Express.Multer.File) {
    const cmd = new CreateInstagramPostCommand(payload.link, image);
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (image && fs.existsSync(image.path)) fs.rmSync(image.path);
      throw exc;
    }
  }

  @Patch(':id')
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor('image', {storage: storageOptions, limits: {fileSize: 1024 * 1024 * 5}}))
  async updateInstagramPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateInstagramPostRequest,
    @UploadedFile() image?: Express.Multer.File
  ) {
    const cmd = new UpdateInstagramPostCommand(payload.link, image);
    cmd.id = id;
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (image && fs.existsSync(image.path)) fs.rmSync(image.path);
      throw exc;
    }
  }

  @Delete(':id')
  @ApiOkResponse()
  async deleteInstagramPost(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteInstagramPostCommand();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}
