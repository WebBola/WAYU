import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateApplicationCommand} from "./create-application.command";
import {CreateApplicationResponse} from "./create-application.response";
import {Application} from "@/features/vacancies/application/application.entity";
import {plainToInstance} from "class-transformer";
import {ApplicationStatus} from "@/core/enum/enum";

@CommandHandler(CreateApplicationCommand)
export class CreateApplicationHandler implements ICommandHandler<CreateApplicationCommand> {
  async execute(command: CreateApplicationCommand): Promise<CreateApplicationResponse> {
    const newApplication = new Application();
    newApplication.fullName = command.fullName;
    newApplication.phoneNumber = command.phoneNumber;
    newApplication.email = command.email;
    newApplication.vacancyId = command.vacancyId;
    newApplication.resume = command.resume;
    newApplication.status = ApplicationStatus.ACTIVE;

    await Application.save(newApplication);
    return plainToInstance(CreateApplicationResponse, newApplication, {excludeExtraneousValues: true});
  }
}
