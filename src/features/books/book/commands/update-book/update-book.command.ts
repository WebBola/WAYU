import { Command } from "@nestjs/cqrs";
import { UpdateBookResponse } from "./update-book.response";

export class UpdateBookCommand extends Command<UpdateBookResponse> {
  public id!: number;

  constructor(
    public authorId?: number,
    public categoryId?: number,
    public title?: string,
    public description?: string | null,
    public pages?: number,
    public year?: number,
    public image?: Express.Multer.File,
    public file?: Express.Multer.File,
  ) {
    super();
  }
}
