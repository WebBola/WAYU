import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdateBookCommand} from "./update-book.command";
import {UpdateBookResponse} from "./update-book.response";
import {Book} from "@/features/books/book/book.entity";
import {plainToInstance} from "class-transformer";
import {Author} from "@/features/books/author/author.entity";
import {BookCategory} from "@/features/books/book-category/book-category.entity";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(UpdateBookCommand)
export class UpdateBookHandler implements ICommandHandler<UpdateBookCommand> {
  async execute(cmd: UpdateBookCommand): Promise<UpdateBookResponse> {
    const book = await Book.findOne({ where: { id: cmd.id } });
    
    if (!book) {
      throw new NotFoundException("Book not found");
    }

    if (cmd.authorId) {
      const authorExists = await Author.existsBy({id: cmd.authorId});
      if (!authorExists) {
        throw new NotFoundException("Author with given id not found");
      }
      book.authorId = cmd.authorId;
    }

    if (cmd.categoryId) {
      const categoryExists = await BookCategory.existsBy({id: cmd.categoryId});
      if (!categoryExists) {
        throw new NotFoundException("Book category with given id not found");
      }
      book.categoryId = cmd.categoryId;
    }

    if (cmd.title) book.title = cmd.title;
    if (cmd.description !== undefined) book.description = cmd.description;
    if (cmd.pages) book.pages = cmd.pages;
    if (cmd.year) book.year = cmd.year;
    if (cmd.image) book.image = cmd.image.path;
    if (cmd.file) book.file = cmd.file.path;

    await Book.save(book);
    return plainToInstance(UpdateBookResponse, book, {excludeExtraneousValues: true});
  }
}