import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteEventCategoryCommand} from "./delete-event-category.command";
import {EventCategory} from "@/features/events/event-category/event-category.entity";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(DeleteEventCategoryCommand)
export class DeleteEventCategoryHandler implements ICommandHandler<DeleteEventCategoryCommand> {
  async execute(cmd: DeleteEventCategoryCommand): Promise<void> {
    const eventCategory = await EventCategory.findOne({ where: { id: cmd.id } });
    
    if (!eventCategory) {
      throw new NotFoundException("Event category not found");
    }

    await EventCategory.remove(eventCategory);
  }
}
