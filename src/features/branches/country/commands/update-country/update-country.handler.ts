import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdateCountryCommand} from "./update-country.command";
import {UpdateCountryResponse} from "./update-country.response";
import {Country} from "@/features/branches/country/country.entity";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(UpdateCountryCommand)
export class UpdateCountryHandler implements ICommandHandler<UpdateCountryCommand> {
  async execute(cmd: UpdateCountryCommand): Promise<UpdateCountryResponse> {
    const country = await Country.findOne({ where: { id: cmd.id } });
    
    if (!country) {
      throw new NotFoundException("Country not found");
    }

    if (cmd.name) country.title = cmd.name;

    await Country.save(country);
    return plainToInstance(UpdateCountryResponse, country, {excludeExtraneousValues: true});
  }
}
