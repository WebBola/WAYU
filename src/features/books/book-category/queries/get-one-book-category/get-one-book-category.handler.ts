import {QueryHandler, IQueryHandler} from "@nestjs/cqrs";
import {GetOneBookCategoryQuery} from "./get-one-book-category.query";
import {GetOneBookCategoryResponse} from "./get-one-book-category.response";
import {BookCategory} from "@/features/books/book-category/book-category.entity";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";

@QueryHandler(GetOneBookCategoryQuery)
export class GetOneBookCategoryHandler implements IQueryHandler<GetOneBookCategoryQuery> {
  async execute(query: GetOneBookCategoryQuery): Promise<GetOneBookCategoryResponse> {
    const bookCategory = await BookCategory.findOne({ where: { id: query.id } });

    if (!bookCategory) {
      throw new NotFoundException("Book category not found");
    }

    return plainToInstance(GetOneBookCategoryResponse, bookCategory, {excludeExtraneousValues: true});
  }
}
