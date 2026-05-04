import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateBookCategoryCommand} from "./create-book-category.command";
import {CreateBookCategoryResponse} from "./create-book-category.response";
import {BookCategory} from "@/features/books/book-category/book-category.entity";
import {plainToInstance} from "class-transformer";

@CommandHandler(CreateBookCategoryCommand)
export class CreateBookCategoryHandler implements ICommandHandler<CreateBookCategoryCommand> {
  async execute(command: CreateBookCategoryCommand): Promise<CreateBookCategoryResponse> {
    const newBookCategory = new BookCategory();
    newBookCategory.title = command.name;

    await BookCategory.save(newBookCategory);
    return plainToInstance(CreateBookCategoryResponse, newBookCategory, {excludeExtraneousValues: true});
  }
}
