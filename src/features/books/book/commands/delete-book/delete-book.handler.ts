import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteBookCommand} from "./delete-book.command";
import {Book} from "@/features/books/book/book.entity";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(DeleteBookCommand)
export class DeleteBookHandler implements ICommandHandler<DeleteBookCommand> {
  async execute(cmd: DeleteBookCommand): Promise<void> {
    const book = await Book.findOne({ where: { id: cmd.id } });
    
    if (!book) {
      throw new NotFoundException("Book not found");
    }

    await Book.remove(book);
  }
}
