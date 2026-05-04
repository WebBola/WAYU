import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdateVacancyCommand} from "./update-vacancy.command";
import {UpdateVacancyResponse} from "./update-vacancy.response";
import {Vacancy} from "@/features/vacancies/vacancy/vacancy.entity";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(UpdateVacancyCommand)
export class UpdateVacancyHandler implements ICommandHandler<UpdateVacancyCommand> {
  async execute(cmd: UpdateVacancyCommand): Promise<UpdateVacancyResponse> {
    const vacancy = await Vacancy.findOne({ where: { id: cmd.id } });
    
    if (!vacancy) {
      throw new NotFoundException("Vacancy not found");
    }

    if (cmd.title) vacancy.title = cmd.title;
    if (cmd.address) vacancy.address = cmd.address;
    if (cmd.description) vacancy.description = cmd.description;
    if (cmd.phoneNumber) vacancy.phoneNumber = cmd.phoneNumber;
    if (cmd.type) vacancy.type = cmd.type as any;
    if (cmd.salary) vacancy.salary = cmd.salary;
    if (cmd.isActive !== undefined) vacancy.isActive = cmd.isActive;

    await Vacancy.save(vacancy);
    return plainToInstance(UpdateVacancyResponse, vacancy, {excludeExtraneousValues: true});
  }
}
