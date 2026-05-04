import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteSocialLinkCommand} from "./delete-social-link.command";
import {SocialLink} from "@/features/social-links/social-link/social-link.entity";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(DeleteSocialLinkCommand)
export class DeleteSocialLinkHandler implements ICommandHandler<DeleteSocialLinkCommand> {
  async execute(cmd: DeleteSocialLinkCommand): Promise<void> {
    const socialLink = await SocialLink.findOne({ where: { id: cmd.id } });
    
    if (!socialLink) {
      throw new NotFoundException("Social link not found");
    }

    await SocialLink.remove(socialLink);
  }
}
