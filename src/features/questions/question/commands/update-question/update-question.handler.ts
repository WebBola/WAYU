import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdateQuestionCommand} from "./update-question.command";
import {UpdateQuestionResponse} from "./update-question.response";
import {Question} from "@/features/questions/question/question.entity";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(UpdateQuestionCommand)
export class UpdateQuestionHandler implements ICommandHandler<UpdateQuestionCommand> {
  async execute(cmd: UpdateQuestionCommand): Promise<UpdateQuestionResponse> {
    const question = await Question.findOne({ where: { id: cmd.id } });
    
    if (!question) {
      throw new NotFoundException("Question not found");
    }

    if (cmd.fullName) question.fullName = cmd.fullName;
    if (cmd.phoneNumber) question.phoneNumber = cmd.phoneNumber;
    if (cmd.question) question.question = cmd.question;
    if (cmd.status) question.status = cmd.status as any;

    await Question.save(question);
    return plainToInstance(UpdateQuestionResponse, question, {excludeExtraneousValues: true});
  }
}
