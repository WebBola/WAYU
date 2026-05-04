import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdateUsefulLinkCommand} from "./update-useful-link.command";
import {UpdateUsefulLinkResponse} from "./update-useful-link.response";
import {UsefulLink} from "@/features/useful-links/useful-link/useful-link.entity";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(UpdateUsefulLinkCommand)
export class UpdateUsefulLinkHandler implements ICommandHandler<UpdateUsefulLinkCommand> {
  async execute(cmd: UpdateUsefulLinkCommand): Promise<UpdateUsefulLinkResponse> {
    const usefulLink = await UsefulLink.findOne({ where: { id: cmd.id } });
    
    if (!usefulLink) {
      throw new NotFoundException("Useful link not found");
    }

    if (cmd.title) usefulLink.title = cmd.title;
    if (cmd.icon) usefulLink.icon = cmd.icon;
    if (cmd.link) usefulLink.link = cmd.link;

    await UsefulLink.save(usefulLink);
    return plainToInstance(UpdateUsefulLinkResponse, usefulLink, {excludeExtraneousValues: true});
  }
}
