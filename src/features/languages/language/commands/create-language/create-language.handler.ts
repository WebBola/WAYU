import {CreateLanguageCommand} from './create-language.command';
import {CreateLanguageResponse} from './create-language.response';
import {Language} from "@/features/languages/language/language.entity";
import {ILike} from "typeorm";
import {BadRequestException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";

@CommandHandler(CreateLanguageCommand)
export class CreateLanguageHandler implements ICommandHandler<CreateLanguageCommand> {

  async execute(command: CreateLanguageCommand): Promise<CreateLanguageResponse> {
    const alreadyExists = await Language.existsBy({title: ILike(command.title)});
    if (alreadyExists)
      throw new BadRequestException("Title is already taken");

    const newLanguage = Language.create({title: command.title} as Language);
    await Language.save(newLanguage);

    return plainToInstance(CreateLanguageResponse, newLanguage, {excludeExtraneousValues: true});
  }
}
