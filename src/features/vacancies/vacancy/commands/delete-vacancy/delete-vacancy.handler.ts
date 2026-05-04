import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteVacancyCommand} from "./delete-vacancy.command";
import {Vacancy} from "@/features/vacancies/vacancy/vacancy.entity";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(DeleteVacancyCommand)
export class DeleteVacancyHandler implements ICommandHandler<DeleteVacancyCommand> {
  async execute(cmd: DeleteVacancyCommand): Promise<void> {
    const vacancy = await Vacancy.findOne({ where: { id: cmd.id } });
    
    if (!vacancy) {
      throw new NotFoundException("Vacancy not found");
    }

    await Vacancy.remove(vacancy);
  }
}
