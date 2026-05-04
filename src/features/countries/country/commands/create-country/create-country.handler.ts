import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateCountryCommand } from "./create-country.command";
import { BadRequestException } from "@nestjs/common";
import { CreateCountryResponse } from "./create-country.response";
import { Country } from "@/features/countries/country/country.entity";
import { plainToInstance } from "class-transformer";

@CommandHandler(CreateCountryCommand)
export class CreateCountryHandler implements ICommandHandler<CreateCountryCommand> {
    async execute(command: CreateCountryCommand): Promise<CreateCountryResponse> {
        const alreadyExists = await Country.existsBy({ title: command.title })
        if (alreadyExists) {
            throw new BadRequestException("Country title is already exists")
        }

        const newCountry = Country.create({
            title: command.title,
            flag: command.flag.path
        });
        await Country.save(newCountry);

        return plainToInstance(CreateCountryResponse, newCountry, { excludeExtraneousValues: true })
    }
}