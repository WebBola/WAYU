import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetAllBooksQuery} from "./get-all-books.query";
import {GetAllBooksResponse} from "./get-all-books.response";
import {Book} from "@/features/books/book/book.entity";
import {plainToInstance} from "class-transformer";

@QueryHandler(GetAllBooksQuery)
export class GetAllBooksHandler implements IQueryHandler<GetAllBooksQuery> {
  async execute(query: GetAllBooksQuery): Promise<GetAllBooksResponse[]> {
    const where: any = {};
    if (query.filters.authorId) {
      where.authorId = query.filters.authorId;
    }
    if (query.filters.categoryId) {
      where.categoryId = query.filters.categoryId;
    }

    const books = await Book.find({
      where,
      order: {createdAt: 'DESC'},
      relations: ['author', 'category']
    });

    return plainToInstance(GetAllBooksResponse, books, {excludeExtraneousValues: true});
  }
}
