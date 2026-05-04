import {QueryHandler, IQueryHandler} from "@nestjs/cqrs";
import {GetAllEventCategoriesQuery} from "./get-all-event-categories.query";
import {GetAllEventCategoriesResponse} from "./get-all-event-categories.response";
import {EventCategory} from "@/features/events/event-category/event-category.entity";
import {plainToInstance} from "class-transformer";

@QueryHandler(GetAllEventCategoriesQuery)
export class GetAllEventCategoriesHandler implements IQueryHandler<GetAllEventCategoriesQuery> {
  async execute(query: GetAllEventCategoriesQuery): Promise<GetAllEventCategoriesResponse[]> {
    const where: any = {};
    
    if (query.filters.title) {
      where.title = query.filters.title;
    }

    const eventCategories = await EventCategory.find({
      where,
      order: {createdAt: 'DESC'}
    });

    return plainToInstance(GetAllEventCategoriesResponse, eventCategories, {excludeExtraneousValues: true});
  }
}
