import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {CreateEventRequest} from "./commands/create-event/create-event.request";
import {FileInterceptor} from "@nestjs/platform-express";
import {CreateEventCommand} from "./commands/create-event/create-event.command";
import {ApiConsumes, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {storageOptions} from "@/configs/multer.config";
import fs from 'fs';
import { GetAllEventsResponse } from "./queries/get-all-events/get-all-events.response";
import { GetAllEventsFilters } from "./queries/get-all-events/get-all-events.filters";
import { GetAllEventsQuery } from "./queries/get-all-events/get-all-events.query";
import { GetOneEventResponse } from "./queries/get-one-event/get-one-event.response";
import { GetOneEventQuery } from "./queries/get-one-event/get-one-event.query";
import { UpdateEventRequest } from "./commands/update-event/update-event.request";
import { UpdateEventCommand } from "./commands/update-event/update-event.command";
import { UpdateEventResponse } from "./commands/update-event/update-event.response";
import { DeleteEventCommand } from "./commands/delete-event/delete-event.command";

@ApiTags('Events')
@Controller('admin/events')
export class EventController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @Post()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor('image', {storage: storageOptions, limits: {fileSize: 1024 * 1024 * 5}}))
  async createEvent(@Body() payload: CreateEventRequest, @UploadedFile() image: Express.Multer.File) {
    let cmd = new CreateEventCommand(payload.categoryId, payload.title, payload.content, image, payload.date, payload.address);
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (fs.existsSync(image.path))
        fs.rmSync(image.path);
      throw exc;
    }
  }

  @Get()
  @ApiOkResponse({ type: [GetAllEventsResponse] })
  async getAllEvents(@Query() filters: GetAllEventsFilters) {
    return await this.queryBus.execute(new GetAllEventsQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneEventResponse })
  async getOneEvent(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneEventQuery(id));
  }

  @Patch(':id')
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor('image', {storage: storageOptions, limits: {fileSize: 1024 * 1024 * 5}}))
  @ApiOkResponse({ type: UpdateEventResponse })
  async updateEvent(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateEventRequest,
    @UploadedFile() image?: Express.Multer.File
  ) {
    const cmd = new UpdateEventCommand(payload.categoryId, payload.title, payload.content, image, payload.date, payload.address);
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
  async deleteEvent(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteEventCommand();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}
