import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetAllEventsQuery} from "./get-all-events.query";
import {GetAllEventsResponse} from "./get-all-events.response";
import {Event} from "@/features/events/event/event.entity";
import {plainToInstance} from "class-transformer";

@QueryHandler(GetAllEventsQuery)
export class GetAllEventsHandler implements IQueryHandler<GetAllEventsQuery> {
  async execute(query: GetAllEventsQuery): Promise<GetAllEventsResponse[]> {
    const where: any = {};
    if (query.filters.categoryId) {
      where.categoryId = query.filters.categoryId;
    }

    const events = await Event.find({
      where,
      order: {date: 'DESC'},
      relations: ['category']
    });

    return plainToInstance(GetAllEventsResponse, events, {excludeExtraneousValues: true});
  }
}
