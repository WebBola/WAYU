import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetOneBookQuery} from "./get-one-book.query";
import {GetOneBookResponse} from "./get-one-book.response";
import {Book} from "@/features/books/book/book.entity";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";

@QueryHandler(GetOneBookQuery)
export class GetOneBookHandler implements IQueryHandler<GetOneBookQuery> {
  async execute(query: GetOneBookQuery): Promise<GetOneBookResponse> {
    const book = await Book.findOne({
      where: { id: query.id },
      relations: ['author', 'category']
    });

    if (!book) {
      throw new NotFoundException("Book not found");
    }

    return plainToInstance(GetOneBookResponse, book, {excludeExtraneousValues: true});
  }
}
