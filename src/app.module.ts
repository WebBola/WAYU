import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { NewsModule } from './features/news/news.module';
import { CountriesModule } from './features/countries/countries.module';
import { LanguagesModule } from './features/languages/languages.module';
import { BooksModule } from './features/books/books.module';
import { BranchesModule } from './features/branches/branches.module';
import { EventsModule } from './features/events/events.module';
import { FaqsModule } from './features/faqs/faqs.module';
import { InstagramPostsModule } from './features/instagram-posts/instagram-posts.module';
import { QuestionsModule } from './features/questions/questions.module';
import { SocialLinksModule } from './features/social-links/social-links.module';
import { UsefulLinksModule } from './features/useful-links/useful-links.module';
import { VacanciesModule } from './features/vacancies/vacancies.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CqrsModule.forRoot(),
    NewsModule,
    CountriesModule,
    LanguagesModule,
    BooksModule,
    BranchesModule,
    EventsModule,
    FaqsModule,
    InstagramPostsModule,
    QuestionsModule,
    SocialLinksModule,
    UsefulLinksModule,
    VacanciesModule,
    
  ],
})
export class AppModule {}