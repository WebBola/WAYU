import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateEventCommand} from "./create-event.command";
import {CreateEventResponse} from "./create-event.response";
import {Event} from "@/features/events/event/event.entity";
import {plainToInstance} from "class-transformer";
import {EventCategory} from "@/features/events/event-category/event-category.entity";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(CreateEventCommand)
export class CreateEventHandler implements ICommandHandler<CreateEventCommand> {
  async execute(cmd: CreateEventCommand): Promise<CreateEventResponse> {
    const categoryExists = await EventCategory.existsBy({id: cmd.categoryId});
    if (!categoryExists) {
      throw new NotFoundException("Event category with given id not found");
    }

    const newEvent = Event.create({
      categoryId: cmd.categoryId,
      title: cmd.title,
      content: cmd.content,
      image: cmd.image.path,
      date: new Date(cmd.date),
      address: cmd.address
    });
    
    await Event.save(newEvent);
    return plainToInstance(CreateEventResponse, newEvent, {excludeExtraneousValues: true});
  }
}
