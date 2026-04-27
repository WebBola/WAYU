import {IsString, MaxLength} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";
import {Command} from "@nestjs/cqrs";
import {CreateNewsCategoryResponse} from "@/features/news/news-category/commands/create-news-category/create-news-category.response";

export class CreateNewsCategoryCommand extends Command<CreateNewsCategoryResponse> {
  @IsString()
  @MaxLength(64)
  @ApiProperty()
  title!: string;
}