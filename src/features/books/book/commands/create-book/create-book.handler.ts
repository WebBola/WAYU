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
    const authorExists = await Author.findOne({where: {id: cmd.authorId}});
    if (!authorExists) {
      throw new NotFoundException("Author with given id not found");
    }

    const categoryExists = await BookCategory.findOne({where: {id: cmd.categoryId}});
    if (!categoryExists) {
      throw new NotFoundException("Book category with given id not found");
    }

    const newBook = new Book();
    newBook.authorId = cmd.authorId;
    newBook.categoryId = cmd.categoryId;
    newBook.title = cmd.title;
    newBook.description = cmd.description;
    newBook.pages = cmd.pages;
    newBook.year = cmd.year;
    newBook.image = cmd.image.path;
    newBook.file = cmd.file.path;
    
    await newBook.save();
    return plainToInstance(CreateBookResponse, newBook, {excludeExtraneousValues: true});
  }
}