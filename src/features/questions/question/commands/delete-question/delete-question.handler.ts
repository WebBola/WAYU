import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteQuestionCommand} from "./delete-question.command";
import {Question} from "@/features/questions/question/question.entity";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(DeleteQuestionCommand)
export class DeleteQuestionHandler implements ICommandHandler<DeleteQuestionCommand> {
  async execute(cmd: DeleteQuestionCommand): Promise<void> {
    const question = await Question.findOne({ where: { id: cmd.id } });
    
    if (!question) {
      throw new NotFoundException("Question not found");
    }

    await Question.remove(question);
  }
}
