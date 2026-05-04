import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteNewsCommand} from "./delete-news.command";
import {News} from "@/features/news/news/news.entity";
import {NotFoundException} from "@nestjs/common";
import fs from 'fs';

@CommandHandler(DeleteNewsCommand)
export class DeleteNewsHandler implements ICommandHandler<DeleteNewsCommand> {
  async execute(command: DeleteNewsCommand): Promise<void> {
    const news = await News.findOneBy({id: command.id});
    if (!news)
      throw new NotFoundException("News not found");

    if (news.image && fs.existsSync(news.image)) {
       fs.rmSync(news.image);
    }

    await News.remove(news);
  }
}
