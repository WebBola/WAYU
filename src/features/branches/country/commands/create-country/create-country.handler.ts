import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateCountryCommand} from "./create-country.command";
import {CreateCountryResponse} from "./create-country.response";
import {Country} from "@/features/branches/country/country.entity";
import {plainToInstance} from "class-transformer";

@CommandHandler(CreateCountryCommand)
export class CreateCountryHandler implements ICommandHandler<CreateCountryCommand> {
  async execute(command: CreateCountryCommand): Promise<CreateCountryResponse> {
    const newCountry = new Country();
    newCountry.title = command.name;

    await Country.save(newCountry);
    return plainToInstance(CreateCountryResponse, newCountry, {excludeExtraneousValues: true});
  }
}
