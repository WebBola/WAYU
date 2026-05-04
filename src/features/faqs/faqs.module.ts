import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { FaqController } from './faq/faq.controller';
import { CreateFaqHandler } from './faq/commands/create-faq/create-faq.handler';
import { UpdateFaqHandler } from './faq/commands/update-faq/update-faq.handler';
import { DeleteFaqHandler } from './faq/commands/delete-faq/delete-faq.handler';
import { GetAllFaqsHandler } from './faq/queries/get-all-faqs/get-all-faqs.handler';
import { GetOneFaqHandler } from './faq/queries/get-one-faq/get-one-faq.handler';
import { TagController } from './tag/tag.controller';
import { CreateTagHandler } from './tag/commands/create-tag/create-tag.handler';
import { UpdateTagHandler } from './tag/commands/update-tag/update-tag.handler';
import { DeleteTagHandler } from './tag/commands/delete-tag/delete-tag.handler';
import { GetAllTagsHandler } from './tag/queries/get-all-tags/get-all-tags.handler';
import { GetOneTagHandler } from './tag/queries/get-one-tag/get-one-tag.handler';

@Module({
  imports: [CqrsModule],
  controllers: [FaqController, TagController],
  providers: [
    CreateFaqHandler,
    UpdateFaqHandler,
    DeleteFaqHandler,
    GetAllFaqsHandler,
    GetOneFaqHandler,

    CreateTagHandler,
    UpdateTagHandler,
    DeleteTagHandler,
    GetAllTagsHandler,
    GetOneTagHandler
  ],
})
export class FaqsModule {}
