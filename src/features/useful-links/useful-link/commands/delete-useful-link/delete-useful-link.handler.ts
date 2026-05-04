import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteUsefulLinkCommand} from "./delete-useful-link.command";
import {UsefulLink} from "@/features/useful-links/useful-link/useful-link.entity";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(DeleteUsefulLinkCommand)
export class DeleteUsefulLinkHandler implements ICommandHandler<DeleteUsefulLinkCommand> {
  async execute(cmd: DeleteUsefulLinkCommand): Promise<void> {
    const usefulLink = await UsefulLink.findOne({ where: { id: cmd.id } });
    
    if (!usefulLink) {
      throw new NotFoundException("Useful link not found");
    }

    await UsefulLink.remove(usefulLink);
  }
}
