import {DeleteLanguageCommand} from './delete-language.command';
import {Language} from "@/features/languages/language/language.entity";
import {NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";

@CommandHandler(DeleteLanguageCommand)
export class DeleteLanguageHandler implements ICommandHandler<DeleteLanguageCommand> {

  async execute(command: DeleteLanguageCommand): Promise<void> {
    const language = await Language.findOneBy({id: command.id});
    if (!language)
      throw new NotFoundException("Language not found");

    await Language.remove(language);
  }
}
