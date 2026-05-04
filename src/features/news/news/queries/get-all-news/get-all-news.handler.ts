import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetAllNewsQuery} from "./get-all-news.query";
import {GetAllNewsResponse} from "./get-all-news.response";
import {News} from "@/features/news/news/news.entity";
import {plainToInstance} from "class-transformer";

@QueryHandler(GetAllNewsQuery)
export class GetAllNewsHandler implements IQueryHandler<GetAllNewsQuery> {
  async execute(query: GetAllNewsQuery): Promise<GetAllNewsResponse[]> {
    const where: any = {};
    if (query.filters.categoryId) {
      where.categoryId = query.filters.categoryId;
    }

    const news = await News.find({
      where,
      order: {createdAt: 'DESC'},
      relations: ['category']
    });

    return plainToInstance(GetAllNewsResponse, news, {excludeExtraneousValues: true});
  }
}
