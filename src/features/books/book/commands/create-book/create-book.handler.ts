import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateBookCommand} from "./create-book.command";
import {CreateBookResponse} from "./create-book.response";
import {Book} from "@/features/books/book/book.entity";
import {plainToInstance} from "class-transformer";
import {Author} from "@/features/books/author/author.entity";
import {BookCategory} from "@/features/books/book-category/book-category.entity";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(CreateBookCommand)
export class CreateBookHandler implements ICommandHandler<CreateBookCommand> {
  async execute(cmd: CreateBookCommand): Promise<CreateBookResponse> {
    const authorExists = await Author.existsBy({id: cmd.authorId});
    if (!authorExists) {
      throw new NotFoundException("Author with given id not found");
    }

    const categoryExists = await BookCategory.existsBy({id: cmd.categoryId});
    if (!categoryExists) {
      throw new NotFoundException("Book category with given id not found");
    }

    const newBook = Book.create({
      authorId: cmd.authorId,
      categoryId: cmd.categoryId,
      title: cmd.title,
      description: cmd.description,
      pages: cmd.pages,
      year: cmd.year,
      image: cmd.image.path,
      file: cmd.file.path
    });
    
    await Book.save(newBook);
    return plainToInstance(CreateBookResponse, newBook, {excludeExtraneousValues: true});
  }
}