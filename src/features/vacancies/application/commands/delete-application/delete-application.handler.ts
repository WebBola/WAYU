import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteApplicationCommand} from "./delete-application.command";
import {Application} from "@/features/vacancies/application/application.entity";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(DeleteApplicationCommand)
export class DeleteApplicationHandler implements ICommandHandler<DeleteApplicationCommand> {
  async execute(cmd: DeleteApplicationCommand): Promise<void> {
    const application = await Application.findOne({ where: { id: cmd.id } });
    
    if (!application) {
      throw new NotFoundException("Application not found");
    }

    await Application.remove(application);
  }
}
