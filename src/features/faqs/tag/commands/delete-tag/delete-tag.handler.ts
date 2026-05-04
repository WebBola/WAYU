import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteTagCommand} from "./delete-tag.command";
import {Tag} from "@/features/faqs/tag/tag.entity";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(DeleteTagCommand)
export class DeleteTagHandler implements ICommandHandler<DeleteTagCommand> {
  async execute(cmd: DeleteTagCommand): Promise<void> {
    const tag = await Tag.findOne({ where: { id: cmd.id } });
    
    if (!tag) {
      throw new NotFoundException("Tag not found");
    }

    await Tag.remove(tag);
  }
}
