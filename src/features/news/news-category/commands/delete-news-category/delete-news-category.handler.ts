import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteNewsCategoryCommand } from "./delete-news-category.command";
import { NewsCategory } from "../../news-category.entity";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(DeleteNewsCategoryCommand)
export class DeleteNewsCategoryHandler implements ICommandHandler<DeleteNewsCategoryCommand>{
    async execute(command: DeleteNewsCategoryCommand): Promise<void> {
        const newsCategory = await NewsCategory.findOneBy({id: command.id})
        if(!newsCategory) throw new NotFoundException("Category Not Found")
        await NewsCategory.remove(newsCategory)
    }
}