import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFiles, UseInterceptors} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {CreateBookRequest} from "./commands/create-book/create-book.request";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {CreateBookCommand} from "./commands/create-book/create-book.command";
import {ApiConsumes, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import fs from 'fs';
import { GetAllBooksResponse } from "./queries/get-all-books/get-all-books.response";
import { GetAllBooksFilters } from "./queries/get-all-books/get-all-books.filters";
import { GetAllBooksQuery } from "./queries/get-all-books/get-all-books.query";
import { GetOneBookResponse } from "./queries/get-one-book/get-one-book.response";
import { GetOneBookQuery } from "./queries/get-one-book/get-one-book.query";
import { UpdateBookRequest } from "./commands/update-book/update-book.request";
import { UpdateBookCommand } from "./commands/update-book/update-book.command";
import { UpdateBookResponse } from "./commands/update-book/update-book.response";
import { DeleteBookCommand } from "./commands/delete-book/delete-book.command";

@ApiTags('Books')
@Controller('admin/books')
export class BookController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @Post()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'file', maxCount: 1 }
  ]))
  async createBook(@Body() payload: CreateBookRequest, @UploadedFiles() files: { image?: Express.Multer.File[], file?: Express.Multer.File[] }) {
    const image = files.image?.[0];
    const file = files.file?.[0];
    
    if (!image || !file) {
      throw new Error("Image and file are required");
    }
    
    let cmd = new CreateBookCommand(payload.authorId, payload.categoryId, payload.title, payload.description || null, payload.pages, payload.year, image, file);
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (image && fs.existsSync(image.path))
        fs.rmSync(image.path);
      if (file && fs.existsSync(file.path))
        fs.rmSync(file.path);
      throw exc;
    }
  }

  @Get()
  @ApiOkResponse({ type: [GetAllBooksResponse] })
  async getAllBooks(@Query() filters: GetAllBooksFilters) {
    return await this.queryBus.execute(new GetAllBooksQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneBookResponse })
  async getOneBook(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneBookQuery(id));
  }

  @Patch(':id')
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'file', maxCount: 1 }
  ]))
  @ApiOkResponse({ type: UpdateBookResponse })
  async updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBookRequest,
    @UploadedFiles() files: { image?: Express.Multer.File[], file?: Express.Multer.File[] }
  ) {
    const image = files.image?.[0];
    const file = files.file?.[0];
    
    const cmd = new UpdateBookCommand(payload.authorId, payload.categoryId, payload.title, payload.description, payload.pages, payload.year, image, file);
    cmd.id = id;
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (image && fs.existsSync(image.path))
        fs.rmSync(image.path);
      if (file && fs.existsSync(file.path))
        fs.rmSync(file.path);
      throw exc;
    }
  }

  @Delete(':id')
  @ApiOkResponse()
  async deleteBook(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteBookCommand();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}
