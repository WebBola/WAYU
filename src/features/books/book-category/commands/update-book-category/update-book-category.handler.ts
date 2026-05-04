import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdateBookCategoryCommand} from "./update-book-category.command";
import {UpdateBookCategoryResponse} from "./update-book-category.response";
import {BookCategory} from "@/features/books/book-category/book-category.entity";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(UpdateBookCategoryCommand)
export class UpdateBookCategoryHandler implements ICommandHandler<UpdateBookCategoryCommand> {
  async execute(cmd: UpdateBookCategoryCommand): Promise<UpdateBookCategoryResponse> {
    const bookCategory = await BookCategory.findOne({ where: { id: cmd.id } });
    
    if (!bookCategory) {
      throw new NotFoundException("Book category not found");
    }

    if (cmd.name) bookCategory.title = cmd.name;

    await BookCategory.save(bookCategory);
    return plainToInstance(UpdateBookCategoryResponse, bookCategory, {excludeExtraneousValues: true});
  }
}
