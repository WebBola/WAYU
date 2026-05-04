import {QueryHandler, IQueryHandler} from "@nestjs/cqrs";
import {GetAllAuthorsQuery} from "./get-all-authors.query";
import {GetAllAuthorsResponse} from "./get-all-authors.response";
import {Author} from "@/features/books/author/author.entity";
import {plainToInstance} from "class-transformer";

@QueryHandler(GetAllAuthorsQuery)
export class GetAllAuthorsHandler implements IQueryHandler<GetAllAuthorsQuery> {
  async execute(query: GetAllAuthorsQuery): Promise<GetAllAuthorsResponse[]> {
    const where: any = {};
    
    if (query.filters.fullName) {
      where.fullName = query.filters.fullName;
    }

    const authors = await Author.find({
      where,
      order: {createdAt: 'DESC'}
    });

    return plainToInstance(GetAllAuthorsResponse, authors, {excludeExtraneousValues: true});
  }
}
