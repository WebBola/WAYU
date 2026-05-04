import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteEventCommand} from "./delete-event.command";
import {Event} from "@/features/events/event/event.entity";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(DeleteEventCommand)
export class DeleteEventHandler implements ICommandHandler<DeleteEventCommand> {
  async execute(cmd: DeleteEventCommand): Promise<void> {
    const event = await Event.findOne({ where: { id: cmd.id } });
    
    if (!event) {
      throw new NotFoundException("Event not found");
    }

    await Event.remove(event);
  }
}
