import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventController } from './event/event.controller';
import { CreateEventHandler } from './event/commands/create-event/create-event.handler';
import { UpdateEventHandler } from './event/commands/update-event/update-event.handler';
import { DeleteEventHandler } from './event/commands/delete-event/delete-event.handler';
import { GetAllEventsHandler } from './event/queries/get-all-events/get-all-events.handler';
import { GetOneEventHandler } from './event/queries/get-one-event/get-one-event.handler';
import { EventCategoryController } from './event-category/event-category.controller';
import { CreateEventCategoryHandler } from './event-category/commands/create-event-category/create-event-category.handler';
import { UpdateEventCategoryHandler } from './event-category/commands/update-event-category/update-event-category.handler';
import { DeleteEventCategoryHandler } from './event-category/commands/delete-event-category/delete-event-category.handler';
import { GetAllEventCategoriesHandler } from './event-category/queries/get-all-event-categories/get-all-event-categories.handler';
import { GetOneEventCategoryHandler } from './event-category/queries/get-one-event-category/get-one-event-category.handler';

@Module({
  imports: [CqrsModule],
  controllers: [EventController, EventCategoryController],
  providers: [
    CreateEventHandler,
    UpdateEventHandler,
    DeleteEventHandler,
    GetAllEventsHandler,
    GetOneEventHandler,

    CreateEventCategoryHandler,
    UpdateEventCategoryHandler,
    DeleteEventCategoryHandler,
    GetAllEventCategoriesHandler,
    GetOneEventCategoryHandler
  ],
})
export class EventsModule {}
