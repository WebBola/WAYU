import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateTagCommand} from "./create-tag.command";
import {CreateTagResponse} from "./create-tag.response";
import {Tag} from "@/features/faqs/tag/tag.entity";
import {plainToInstance} from "class-transformer";

@CommandHandler(CreateTagCommand)
export class CreateTagHandler implements ICommandHandler<CreateTagCommand> {
  async execute(command: CreateTagCommand): Promise<CreateTagResponse> {
    const newTag = new Tag();
    newTag.title = command.title;

    await Tag.save(newTag);
    return plainToInstance(CreateTagResponse, newTag, {excludeExtraneousValues: true});
  }
}
