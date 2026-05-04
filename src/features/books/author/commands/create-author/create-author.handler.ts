import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateAuthorCommand} from "./create-author.command";
import {CreateAuthorResponse} from "./create-author.response";
import {Author} from "@/features/books/author/author.entity";
import {plainToInstance} from "class-transformer";

@CommandHandler(CreateAuthorCommand)
export class CreateAuthorHandler implements ICommandHandler<CreateAuthorCommand> {
  async execute(command: CreateAuthorCommand): Promise<CreateAuthorResponse> {
    const newAuthor = new Author();
    newAuthor.fullName = command.fullName;

    await Author.save(newAuthor);
    return plainToInstance(CreateAuthorResponse, newAuthor, {excludeExtraneousValues: true});
  }
}
