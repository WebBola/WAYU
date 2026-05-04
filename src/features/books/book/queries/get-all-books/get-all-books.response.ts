import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";
import {Author} from "@/features/books/author/author.entity";
import {BookCategory} from "@/features/books/book-category/book-category.entity";

export class GetAllBooksResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  authorId!: number;

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
  description!: string | null;

  @Expose()
  @ApiProperty()
  file!: string;

  @Expose()
  @ApiProperty()
  pages!: number;

  @Expose()
  @ApiProperty()
  year!: number;

  @Expose()
  @ApiProperty()
  createdAt!: Date;

  @Expose()
  @ApiProperty()
  updatedAt!: Date;
}
