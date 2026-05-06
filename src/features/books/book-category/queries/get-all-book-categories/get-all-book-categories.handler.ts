import {QueryHandler, IQueryHandler} from "@nestjs/cqrs";
import {GetAllBookCategoriesQuery} from "./get-all-book-categories.query";
import {GetAllBookCategoriesResponse} from "./get-all-book-categories.response";
import {BookCategory} from "@/features/books/book-category/book-category.entity";
import {plainToInstance} from "class-transformer";

@QueryHandler(GetAllBookCategoriesQuery)
export class GetAllBookCategoriesHandler implements IQueryHandler<GetAllBookCategoriesQuery> {
  async execute(query: GetAllBookCategoriesQuery): Promise<GetAllBookCategoriesResponse[]> {
    const where: any = {};
    
    if (query.filters.name) {
      where.title = query.filters.name;
    }

    const bookCategories = await BookCategory.find({
      where,
      order: {createdAt: 'DESC'}
    }); 

    

    return plainToInstance(GetAllBookCategoriesResponse, bookCategories, {excludeExtraneousValues: true});
  }
}
