import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateVacancyCommand} from "./create-vacancy.command";
import {CreateVacancyResponse} from "./create-vacancy.response";
import {Vacancy} from "@/features/vacancies/vacancy/vacancy.entity";
import {plainToInstance} from "class-transformer";

@CommandHandler(CreateVacancyCommand)
export class CreateVacancyHandler implements ICommandHandler<CreateVacancyCommand> {
  async execute(cmd: CreateVacancyCommand): Promise<CreateVacancyResponse> {
    const newVacancy = Vacancy.create({
      title: cmd.title,
      address: cmd.address,
      description: cmd.description,
      phoneNumber: cmd.phoneNumber,
      type: cmd.type as any,
      salary: cmd.salary,
      isActive: cmd.isActive
    });

    await Vacancy.save(newVacancy);
    return plainToInstance(CreateVacancyResponse, newVacancy, {excludeExtraneousValues: true});
  }
}
