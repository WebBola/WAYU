import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdateNewsCategoryCommand} from "./update-news-category.command";
import {UpdateNewsCategoryResponse} from "./update-news-category.response";
import {NewsCategory} from "@/features/news/news-category/news-category.entity";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(UpdateNewsCategoryCommand)
export class UpdateNewsCategoryHandler implements ICommandHandler<UpdateNewsCategoryCommand> {
  async execute(cmd: UpdateNewsCategoryCommand): Promise<UpdateNewsCategoryResponse> {
    const newsCategory = await NewsCategory.findOne({ where: { id: cmd.id } });
    
    if (!newsCategory) {
      throw new NotFoundException("News category not found");
    }

    if (cmd.name) newsCategory.title = cmd.name;

    await NewsCategory.save(newsCategory);
    return plainToInstance(UpdateNewsCategoryResponse, newsCategory, {excludeExtraneousValues: true});
  }
}
