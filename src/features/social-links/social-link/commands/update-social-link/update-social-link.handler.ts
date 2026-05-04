import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdateSocialLinkCommand} from "./update-social-link.command";
import {UpdateSocialLinkResponse} from "./update-social-link.response";
import {SocialLink} from "@/features/social-links/social-link/social-link.entity";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(UpdateSocialLinkCommand)
export class UpdateSocialLinkHandler implements ICommandHandler<UpdateSocialLinkCommand> {
  async execute(cmd: UpdateSocialLinkCommand): Promise<UpdateSocialLinkResponse> {
    const socialLink = await SocialLink.findOne({ where: { id: cmd.id } });
    
    if (!socialLink) {
      throw new NotFoundException("Social link not found");
    }

    if (cmd.title) socialLink.title = cmd.title;
    if (cmd.icon) socialLink.icon = cmd.icon;
    if (cmd.link) socialLink.link = cmd.link;

    await SocialLink.save(socialLink);
    return plainToInstance(UpdateSocialLinkResponse, socialLink, {excludeExtraneousValues: true});
  }
}
