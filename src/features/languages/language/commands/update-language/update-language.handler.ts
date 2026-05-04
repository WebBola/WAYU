import {UpdateLanguageCommand} from './update-language.command';
import {UpdateLanguageResponse} from './update-language.response';
import {Language} from "@/features/languages/language/language.entity";
import {ILike} from "typeorm";
import {BadRequestException, NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";

@CommandHandler(UpdateLanguageCommand)
export class UpdateLanguageHandler implements ICommandHandler<UpdateLanguageCommand> {

  async execute(command: UpdateLanguageCommand): Promise<UpdateLanguageResponse> {
    const language = await Language.findOneBy({id: command.id});
    if (!language)
      throw new NotFoundException("Language not found");

    if (command.title) {
      const alreadyExists = await Language.existsBy({title: ILike(command.title)});
      if (alreadyExists && language.title !== command.title)
        throw new BadRequestException("Title is already taken");
      
      language.title = command.title;
    }

    await Language.save(language);

    return plainToInstance(UpdateLanguageResponse, language, {excludeExtraneousValues: true});
  }
}
