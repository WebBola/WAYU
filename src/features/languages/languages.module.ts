import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { LanguageController } from './language/language.controller';
import { PublicLanguageController } from './language/public-language.controller';
import { CreateLanguageHandler } from './language/commands/create-language/create-language.handler';
import { DeleteLanguageHandler } from './language/commands/delete-language/delete-language.handler';
import { UpdateLanguageHandler } from './language/commands/update-language/update-language.handler';
import { GetAllLanguagesHandler } from './language/queries/get-all-languages/get-all-languages.handler';
import { GetOneLanguageHandler } from './language/queries/get-one-language/get-one-language.handler';

const CommandHandlers = [
  CreateLanguageHandler,
  DeleteLanguageHandler,
  UpdateLanguageHandler,
];

const QueryHandlers = [
  GetAllLanguagesHandler,
  GetOneLanguageHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [LanguageController, PublicLanguageController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class LanguagesModule {}
