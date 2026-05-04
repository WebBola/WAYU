import {Command} from "@nestjs/cqrs";
import {UpdateNewsResponse} from "./update-news.response";

export class UpdateNewsCommand extends Command<UpdateNewsResponse> {
  public id!: number;

  constructor(
    public categoryId?: number,
    public countryId?: number,
    public title?: string,
    public image?: Express.Multer.File,
    public date?: Date,
    public content?: string,
  ) {
    super();
  }
}
