import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetOneEventQuery} from "./get-one-event.query";
import {GetOneEventResponse} from "./get-one-event.response";
import {Event} from "@/features/events/event/event.entity";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";

@QueryHandler(GetOneEventQuery)
export class GetOneEventHandler implements IQueryHandler<GetOneEventQuery> {
  async execute(query: GetOneEventQuery): Promise<GetOneEventResponse> {
    const event = await Event.findOne({
      where: { id: query.id },
      relations: ['category']
    });

    if (!event) {
      throw new NotFoundException("Event not found");
    }

    return plainToInstance(GetOneEventResponse, event, {excludeExtraneousValues: true});
  }
}
