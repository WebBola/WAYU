import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateEventCategoryCommand} from "./create-event-category.command";
import {CreateEventCategoryResponse} from "./create-event-category.response";
import {EventCategory} from "@/features/events/event-category/event-category.entity";
import {plainToInstance} from "class-transformer";

@CommandHandler(CreateEventCategoryCommand)
export class CreateEventCategoryHandler implements ICommandHandler<CreateEventCategoryCommand> {
  async execute(command: CreateEventCategoryCommand): Promise<CreateEventCategoryResponse> {
    const newEventCategory = new EventCategory();
    newEventCategory.title = command.title;

    await EventCategory.save(newEventCategory);
    return plainToInstance(CreateEventCategoryResponse, newEventCategory, {excludeExtraneousValues: true});
  }
}
