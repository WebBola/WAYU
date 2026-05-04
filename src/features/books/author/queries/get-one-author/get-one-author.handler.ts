import {QueryHandler, IQueryHandler} from "@nestjs/cqrs";
import {GetOneAuthorQuery} from "./get-one-author.query";
import {GetOneAuthorResponse} from "./get-one-author.response";
import {Author} from "@/features/books/author/author.entity";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";

@QueryHandler(GetOneAuthorQuery)
export class GetOneAuthorHandler implements IQueryHandler<GetOneAuthorQuery> {
  async execute(query: GetOneAuthorQuery): Promise<GetOneAuthorResponse> {
    const author = await Author.findOne({ where: { id: query.id } });

    if (!author) {
      throw new NotFoundException("Author not found");
    }

    return plainToInstance(GetOneAuthorResponse, author, {excludeExtraneousValues: true});
  }
}
