import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {typeOrmConfig} from './configs/typeorm.config';
import {NewsModule} from "src/features/news/news.module";
import {CqrsModule} from "@nestjs/cqrs";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CqrsModule.forRoot(),
    NewsModule
  ],
})
export class AppModule {
}