import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteBookCategoryCommand} from "./delete-book-category.command";
import {BookCategory} from "@/features/books/book-category/book-category.entity";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(DeleteBookCategoryCommand)
export class DeleteBookCategoryHandler implements ICommandHandler<DeleteBookCategoryCommand> {
  async execute(cmd: DeleteBookCategoryCommand): Promise<void> {
    const bookCategory = await BookCategory.findOne({ where: { id: cmd.id } });
    
    if (!bookCategory) {
      throw new NotFoundException("Book category not found");
    }

    await BookCategory.remove(bookCategory);
  }
}
