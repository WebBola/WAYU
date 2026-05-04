import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BookController } from './book/book.controller';
import { PublicBookController } from './book/public-book.controller';
import { CreateBookHandler } from './book/commands/create-book/create-book.handler';
import { UpdateBookHandler } from './book/commands/update-book/update-book.handler';
import { DeleteBookHandler } from './book/commands/delete-book/delete-book.handler';
import { GetAllBooksHandler } from './book/queries/get-all-books/get-all-books.handler';
import { GetOneBookHandler } from './book/queries/get-one-book/get-one-book.handler';
import { AuthorController } from './author/author.controller';
import { BookCategoryController } from './book-category/book-category.controller';
import { CreateAuthorHandler } from './author/commands/create-author/create-author.handler';
import { UpdateAuthorHandler } from './author/commands/update-author/update-author.handler';
import { DeleteAuthorHandler } from './author/commands/delete-author/delete-author.handler';
import { GetAllAuthorsHandler } from './author/queries/get-all-authors/get-all-authors.handler';
import { GetOneAuthorHandler } from './author/queries/get-one-author/get-one-author.handler';
import { CreateBookCategoryHandler } from './book-category/commands/create-book-category/create-book-category.handler';
import { UpdateBookCategoryHandler } from './book-category/commands/update-book-category/update-book-category.handler';
import { DeleteBookCategoryHandler } from './book-category/commands/delete-book-category/delete-book-category.handler';
import { GetAllBookCategoriesHandler } from './book-category/queries/get-all-book-categories/get-all-book-categories.handler';
import { GetOneBookCategoryHandler } from './book-category/queries/get-one-book-category/get-one-book-category.handler';

@Module({
  imports: [CqrsModule],
  controllers: [BookController, PublicBookController, AuthorController, BookCategoryController],
  providers: [
    CreateBookHandler,
    UpdateBookHandler,
    DeleteBookHandler,
    GetAllBooksHandler,
    GetOneBookHandler,

    CreateAuthorHandler,
    UpdateAuthorHandler,
    DeleteAuthorHandler,
    GetAllAuthorsHandler,
    GetOneAuthorHandler,

    CreateBookCategoryHandler,
    UpdateBookCategoryHandler,
    DeleteBookCategoryHandler,
    GetAllBookCategoriesHandler,
    GetOneBookCategoryHandler
  ],
})
export class BooksModule { }
