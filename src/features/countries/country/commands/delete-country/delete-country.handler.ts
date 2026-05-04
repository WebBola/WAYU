import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteCountryCommand } from "./delete-country.command";
import { Language } from "@/core/entities/language.entity";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(DeleteCountryCommand)
export class DeleteCountryHandler implements ICommandHandler<DeleteCountryCommand>{
    async execute(command: DeleteCountryCommand): Promise<void>{
        const language = await Language.findOneBy({id: command.id});
        if(!language)
            throw new NotFoundException("Language Not Found");
        await Language.remove(language)
    }
}  
