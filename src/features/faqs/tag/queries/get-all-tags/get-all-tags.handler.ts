import {QueryHandler, IQueryHandler} from "@nestjs/cqrs";
import {GetAllTagsQuery} from "./get-all-tags.query";
import {GetAllTagsResponse} from "./get-all-tags.response";
import {Tag} from "@/features/faqs/tag/tag.entity";
import {plainToInstance} from "class-transformer";

@QueryHandler(GetAllTagsQuery)
export class GetAllTagsHandler implements IQueryHandler<GetAllTagsQuery> {
  async execute(query: GetAllTagsQuery): Promise<GetAllTagsResponse[]> {
    const where: any = {};
    
    if (query.filters.title) {
      where.title = query.filters.title;
    }

    const tags = await Tag.find({
      where,
      order: {createdAt: 'DESC'}
    });

    return plainToInstance(GetAllTagsResponse, tags, {excludeExtraneousValues: true});
  }
}
