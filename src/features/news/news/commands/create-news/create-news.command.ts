import { Command } from "@nestjs/cqrs";
import { CreateNewsResponse } from "./create-news.response";

export class CreateNewsCommand extends Command<CreateNewsResponse> {
    constructor(
        public categoryId: number,
        public countryId: number | null,
        public title: string,
        public image: Express.Multer.File,
        public date: Date,
        public content: string
    ) {
        super();
    }
}