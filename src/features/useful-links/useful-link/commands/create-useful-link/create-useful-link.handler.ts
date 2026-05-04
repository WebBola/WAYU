import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateUsefulLinkCommand} from "./create-useful-link.command";
import {CreateUsefulLinkResponse} from "./create-useful-link.response";
import {UsefulLink} from "../../useful-link.entity";
import {plainToInstance} from "class-transformer";

@CommandHandler(CreateUsefulLinkCommand)
export class CreateUsefulLinkHandler implements ICommandHandler<CreateUsefulLinkCommand> {
  async execute(command: CreateUsefulLinkCommand): Promise<CreateUsefulLinkResponse> {
    const newEntity = UsefulLink.create({
      title: command.title,
      link: command.link,
      icon: command.icon.path,
    });
    await UsefulLink.save(newEntity);
    return plainToInstance(CreateUsefulLinkResponse, newEntity, {excludeExtraneousValues: true});
  }
}
