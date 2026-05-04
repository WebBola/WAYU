import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetOneNewsQuery} from "./get-one-news.query";
import {GetOneNewsResponse} from "./get-one-news.response";
import {News} from "@/features/news/news/news.entity";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";

@QueryHandler(GetOneNewsQuery)
export class GetOneNewsHandler implements IQueryHandler<GetOneNewsQuery> {
  async execute(query: GetOneNewsQuery): Promise<GetOneNewsResponse> {
    const news = await News.findOne({
      where: {id: query.id},
      relations: ['category']
    });

    if (!news)
      throw new NotFoundException("News not found");

    return plainToInstance(GetOneNewsResponse, news, {excludeExtraneousValues: true});
  }
}
