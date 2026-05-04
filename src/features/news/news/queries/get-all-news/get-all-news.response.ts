import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";
import {NewsCategory} from "@/features/news/news-category/news-category.entity";

export class GetAllNewsResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  categoryId!: number;

  @Expose()
  @ApiProperty()
  title!: string;

  @Expose()
  @ApiProperty()
  image!: string;

  @Expose()
  @ApiProperty()
  createdAt!: Date;
}
