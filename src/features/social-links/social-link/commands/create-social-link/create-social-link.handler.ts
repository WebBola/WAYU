import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateSocialLinkCommand} from "./create-social-link.command";
import {CreateSocialLinkResponse} from "./create-social-link.response";
import {SocialLink} from "../../social-link.entity";
import {plainToInstance} from "class-transformer";

@CommandHandler(CreateSocialLinkCommand)
export class CreateSocialLinkHandler implements ICommandHandler<CreateSocialLinkCommand> {
  async execute(command: CreateSocialLinkCommand): Promise<CreateSocialLinkResponse> {
    const newEntity = SocialLink.create({
      title: command.title,
      link: command.link,
      icon: command.icon.path,
    });
    await SocialLink.save(newEntity);
    return plainToInstance(CreateSocialLinkResponse, newEntity, {excludeExtraneousValues: true});
  }
}
