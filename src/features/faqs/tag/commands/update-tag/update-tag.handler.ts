import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdateTagCommand} from "./update-tag.command";
import {UpdateTagResponse} from "./update-tag.response";
import {Tag} from "@/features/faqs/tag/tag.entity";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(UpdateTagCommand)
export class UpdateTagHandler implements ICommandHandler<UpdateTagCommand> {
  async execute(cmd: UpdateTagCommand): Promise<UpdateTagResponse> {
    const tag = await Tag.findOne({ where: { id: cmd.id } });
    
    if (!tag) {
      throw new NotFoundException("Tag not found");
    }

    if (cmd.title) tag.title = cmd.title;

    await Tag.save(tag);
    return plainToInstance(UpdateTagResponse, tag, {excludeExtraneousValues: true});
  }
}
