import {QueryHandler, IQueryHandler} from "@nestjs/cqrs";
import {GetOneEventCategoryQuery} from "./get-one-event-category.query";
import {GetOneEventCategoryResponse} from "./get-one-event-category.response";
import {EventCategory} from "@/features/events/event-category/event-category.entity";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";

@QueryHandler(GetOneEventCategoryQuery)
export class GetOneEventCategoryHandler implements IQueryHandler<GetOneEventCategoryQuery> {
  async execute(query: GetOneEventCategoryQuery): Promise<GetOneEventCategoryResponse> {
    const eventCategory = await EventCategory.findOne({ where: { id: query.id } });

    if (!eventCategory) {
      throw new NotFoundException("Event category not found");
    }

    return plainToInstance(GetOneEventCategoryResponse, eventCategory, {excludeExtraneousValues: true});
  }
}
