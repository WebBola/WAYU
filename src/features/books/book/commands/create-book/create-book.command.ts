import { Command } from "@nestjs/cqrs";
import { CreateBookResponse } from "./create-book.response";

export class CreateBookCommand extends Command<CreateBookResponse> {
    constructor(
      public authorId: number,
      public categoryId: number,
      public title: string,
      public description: string | null,
      public pages: number,
      public year: number,
      public image: Express.Multer.File,
      public file: Express.Multer.File
    ) {
        super();
    }
}
