import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdateNewsCommand} from "./update-news.command";
import {UpdateNewsResponse} from "./update-news.response";
import {News} from "@/features/news/news/news.entity";
import {BadRequestException, NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {NewsCategory} from "@/features/news/news-category/news-category.entity";
import {Country} from "@/features/countries/country/country.entity";
import fs from 'fs';

@CommandHandler(UpdateNewsCommand)
export class UpdateNewsHandler implements ICommandHandler<UpdateNewsCommand> {
  async execute(command: UpdateNewsCommand): Promise<UpdateNewsResponse> {
    const news = await News.findOneBy({id: command.id});
    if (!news)
      throw new NotFoundException("News not found");

    if (command.categoryId) {
      const categoryExists = await NewsCategory.existsBy({id: command.categoryId});
      if (!categoryExists)
        throw new NotFoundException("Category with given id not found");
      news.categoryId = command.categoryId;
    }

    if (command.countryId) {
      const countryExists = await Country.existsBy({id: command.countryId});
      if (!countryExists)
        throw new NotFoundException("Country with given id not found");
      news.countryId = command.countryId;
    }

    if (command.title) {
      news.title = command.title;
    }

    if (command.image) {
      if (news.image && fs.existsSync(news.image)) {
         fs.rmSync(news.image);
      }
      news.image = command.image.path;
    }

    if (command.date) {
      news.date = command.date;
    }

    if (command.content) {
      news.content = command.content;
    }

    await News.save(news);

    return plainToInstance(UpdateNewsResponse, news, {excludeExtraneousValues: true});
  }
}
