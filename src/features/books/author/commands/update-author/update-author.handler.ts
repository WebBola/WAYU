import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdateAuthorCommand} from "./update-author.command";
import {UpdateAuthorResponse} from "./update-author.response";
import {Author} from "@/features/books/author/author.entity";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(UpdateAuthorCommand)
export class UpdateAuthorHandler implements ICommandHandler<UpdateAuthorCommand> {
  async execute(cmd: UpdateAuthorCommand): Promise<UpdateAuthorResponse> {
    const author = await Author.findOne({ where: { id: cmd.id } });
    
    if (!author) {
      throw new NotFoundException("Author not found");
    }

    if (cmd.fullName) author.fullName = cmd.fullName;

    await Author.save(author);
    return plainToInstance(UpdateAuthorResponse, author, {excludeExtraneousValues: true});
  }
}
