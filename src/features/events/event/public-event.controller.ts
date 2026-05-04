import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { GetAllEventsResponse } from "./queries/get-all-events/get-all-events.response";
import { GetAllEventsFilters } from "./queries/get-all-events/get-all-events.filters";
import { GetAllEventsQuery } from "./queries/get-all-events/get-all-events.query";
import { GetOneEventResponse } from "./queries/get-one-event/get-one-event.response";
import { GetOneEventQuery } from "./queries/get-one-event/get-one-event.query";

@ApiTags('Public Events')
@Controller('public/events')
export class PublicEventController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

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
}
