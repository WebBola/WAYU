import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdateEventCommand} from "./update-event.command";
import {UpdateEventResponse} from "./update-event.response";
import {Event} from "@/features/events/event/event.entity";
import {plainToInstance} from "class-transformer";
import {EventCategory} from "@/features/events/event-category/event-category.entity";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(UpdateEventCommand)
export class UpdateEventHandler implements ICommandHandler<UpdateEventCommand> {
  async execute(cmd: UpdateEventCommand): Promise<UpdateEventResponse> {
    const event = await Event.findOne({ where: { id: cmd.id } });
    
    if (!event) {
      throw new NotFoundException("Event not found");
    }

    if (cmd.categoryId) {
      const categoryExists = await EventCategory.existsBy({id: cmd.categoryId});
      if (!categoryExists) {
        throw new NotFoundException("Event category with given id not found");
      }
      event.categoryId = cmd.categoryId;
    }

    if (cmd.title) event.title = cmd.title;
    if (cmd.content) event.content = cmd.content;
    if (cmd.image) event.image = cmd.image.path;
    if (cmd.date) event.date = new Date(cmd.date);
    if (cmd.address) event.address = cmd.address;

    await Event.save(event);
    return plainToInstance(UpdateEventResponse, event, {excludeExtraneousValues: true});
  }
}
