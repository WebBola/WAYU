import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteAuthorCommand} from "./delete-author.command";
import {Author} from "@/features/books/author/author.entity";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(DeleteAuthorCommand)
export class DeleteAuthorHandler implements ICommandHandler<DeleteAuthorCommand> {
  async execute(cmd: DeleteAuthorCommand): Promise<void> {
    const author = await Author.findOne({ where: { id: cmd.id } });
    
    if (!author) {
      throw new NotFoundException("Author not found");
    }

    await Author.remove(author);
  }
}
