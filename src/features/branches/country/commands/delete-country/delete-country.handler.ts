import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteCountryCommand} from "./delete-country.command";
import {Country} from "@/features/branches/country/country.entity";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(DeleteCountryCommand)
export class DeleteCountryHandler implements ICommandHandler<DeleteCountryCommand> {
  async execute(cmd: DeleteCountryCommand): Promise<void> {
    const country = await Country.findOne({ where: { id: cmd.id } });
    
    if (!country) {
      throw new NotFoundException("Country not found");
    }

    await Country.remove(country);
  }
}
