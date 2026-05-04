import {Module} from "@nestjs/common";
import {CqrsModule} from "@nestjs/cqrs";
import {NewsCategoryController} from "@/features/news/news-category/news-category.controller";
import {CreateNewsCategoryHandler} from "@/features/news/news-category/commands/create-news-category/create-news-category.handler";
import {GetAllNewsCategoriesHandler} from "@/features/news/news-category/queries/get-all-news-categories/get-all-news-categories.handler";
import { DeleteNewsCategoryHandler } from "@/features/news/news-category/commands/delete-news-category/delete-news-category.handler";
import { UpdateNewsCategoryHandler } from "@/features/news/news-category/commands/update-news-category/update-news-category.handler";
import { GetOneNewsCategoryHandler } from "@/features/news/news-category/queries/get-one-news-category/get-one-news-category.handler";
import { NewsController } from "./news/news.controller";
import { CreateNewsHandler } from "@/features/news/news/commands/create-news/create-news.handler";

import { UpdateNewsHandler } from "@/features/news/news/commands/update-news/update-news.handler";
import { DeleteNewsHandler } from "@/features/news/news/commands/delete-news/delete-news.handler";
import { GetAllNewsHandler } from "@/features/news/news/queries/get-all-news/get-all-news.handler";
import { GetOneNewsHandler } from "@/features/news/news/queries/get-one-news/get-one-news.handler";

@Module({
  imports: [CqrsModule],
  controllers: [
    NewsCategoryController,
    NewsController
  ],
  providers: [
    GetAllNewsCategoriesHandler,
    CreateNewsCategoryHandler,
    DeleteNewsCategoryHandler,
    UpdateNewsCategoryHandler,
    GetOneNewsCategoryHandler,
    CreateNewsHandler,
    UpdateNewsHandler,
    DeleteNewsHandler,
    GetAllNewsHandler,
    GetOneNewsHandler
  ]
})
export class NewsModule {
}