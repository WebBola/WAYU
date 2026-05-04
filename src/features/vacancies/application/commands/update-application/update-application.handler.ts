import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdateApplicationCommand} from "./update-application.command";
import {UpdateApplicationResponse} from "./update-application.response";
import {Application} from "@/features/vacancies/application/application.entity";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(UpdateApplicationCommand)
export class UpdateApplicationHandler implements ICommandHandler<UpdateApplicationCommand> {
  async execute(cmd: UpdateApplicationCommand): Promise<UpdateApplicationResponse> {
    const application = await Application.findOne({ where: { id: cmd.id } });
    
    if (!application) {
      throw new NotFoundException("Application not found");
    }

    if (cmd.fullName) application.fullName = cmd.fullName;
    if (cmd.email) application.email = cmd.email;
    if (cmd.phoneNumber) application.phoneNumber = cmd.phoneNumber;

    await Application.save(application);
    return plainToInstance(UpdateApplicationResponse, application, {excludeExtraneousValues: true});
  }
}
