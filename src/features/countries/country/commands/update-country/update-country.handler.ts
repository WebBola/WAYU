import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateCountryCommand } from "./update-country.command";
import { UpdateCountryResponse } from "./update-country.response";
import { Country } from "../../country.entity";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { ILike } from "typeorm";

@CommandHandler(UpdateCountryCommand)
export class UpdateCountryHandler implements ICommandHandler<UpdateCountryCommand> {
    async execute(command: UpdateCountryCommand): Promise<UpdateCountryResponse> {
        const country = await Country.findOneBy({ id: command.id });
        if (!country)
            throw new NotFoundException("Country not found");

        if (command.title) {
            const alreadyExists = await Country.existsBy({ title: ILike(command.title) });
            if (alreadyExists && country.title !== command.title)
                throw new BadRequestException("Title is already taken");

            country.title = command.title;
        }

        if (command.flag) {
            country.flag = command.flag.path;
        }

        await Country.save(country);

        return plainToInstance(UpdateCountryResponse, country, { excludeExtraneousValues: true });
    }
}