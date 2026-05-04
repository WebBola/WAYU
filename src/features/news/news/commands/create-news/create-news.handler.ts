import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateNewsCommand} from "./create-news.command";
import {CreateNewsResponse} from "./create-news.response";
import {News} from "@/features/news/news/news.entity";
import {plainToInstance} from "class-transformer";
import {NewsCategory} from "@/features/news/news-category/news-category.entity";
import {Country} from "@/features/countries/country/country.entity";
import {NotFoundException} from "@nestjs/common";


@CommandHandler(CreateNewsCommand)
export class CreateNewsHandler implements ICommandHandler<CreateNewsCommand> {
  async execute(cmd: CreateNewsCommand): Promise<CreateNewsResponse> {
    const categoryExists = await NewsCategory.existsBy({id: cmd.categoryId});
    if (!categoryExists) {
      throw new NotFoundException("Category with given id not found");
    }

    if (cmd.countryId) {
      const countryExists = await Country.existsBy({id: cmd.countryId});
      if (!countryExists) {
        throw new NotFoundException("Country with given id not found");
      }
    }

    const newNews = News.create({
      categoryId: cmd.categoryId,
      countryId: cmd.countryId || undefined,
      title: cmd.title,
      image: cmd.image.path,
      date: cmd.date,
      content: cmd.content
    });
    await News.save(newNews);
    return plainToInstance(CreateNewsResponse, newNews, {excludeExtraneousValues: true});
  }
}