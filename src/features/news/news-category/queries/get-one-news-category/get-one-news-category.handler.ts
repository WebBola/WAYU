import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetOneNewsCategoryQuery} from "./get-one-news-category.query";
import {GetOneNewsCategoryResponse} from "./get-one-news-category.response";
import {NewsCategory} from "@/features/news/news-category/news-category.entity";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";

@QueryHandler(GetOneNewsCategoryQuery)
export class GetOneNewsCategoryHandler implements IQueryHandler<GetOneNewsCategoryQuery> {
  async execute(query: GetOneNewsCategoryQuery): Promise<GetOneNewsCategoryResponse> {
    const newsCategory = await NewsCategory.findOne({ where: { id: query.id } });

    if (!newsCategory) {
      throw new NotFoundException("News category not found");
    }

    return plainToInstance(GetOneNewsCategoryResponse, newsCategory, {excludeExtraneousValues: true});
  }
}
