import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdateEventCategoryCommand} from "./update-event-category.command";
import {UpdateEventCategoryResponse} from "./update-event-category.response";
import {EventCategory} from "@/features/events/event-category/event-category.entity";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(UpdateEventCategoryCommand)
export class UpdateEventCategoryHandler implements ICommandHandler<UpdateEventCategoryCommand> {
  async execute(cmd: UpdateEventCategoryCommand): Promise<UpdateEventCategoryResponse> {
    const eventCategory = await EventCategory.findOne({ where: { id: cmd.id } });
    
    if (!eventCategory) {
      throw new NotFoundException("Event category not found");
    }

    if (cmd.title) eventCategory.title = cmd.title;

    await EventCategory.save(eventCategory);
    return plainToInstance(UpdateEventCategoryResponse, eventCategory, {excludeExtraneousValues: true});
  }
}
