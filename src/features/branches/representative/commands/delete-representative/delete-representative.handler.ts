import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteRepresentativeCommand} from "./delete-representative.command";
import {Representative} from "@/features/branches/representative/representative.entity";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(DeleteRepresentativeCommand)
export class DeleteRepresentativeHandler implements ICommandHandler<DeleteRepresentativeCommand> {
  async execute(cmd: DeleteRepresentativeCommand): Promise<void> {
    const representative = await Representative.findOne({ where: { id: cmd.id } });
    
    if (!representative) {
      throw new NotFoundException("Representative not found");
    }

    await Representative.remove(representative);
  }
}
