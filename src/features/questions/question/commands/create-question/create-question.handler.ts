import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateQuestionCommand} from "./create-question.command";
import {CreateQuestionResponse} from "./create-question.response";
import {Question} from "../../question.entity";
import {plainToInstance} from "class-transformer";

@CommandHandler(CreateQuestionCommand)
export class CreateQuestionHandler implements ICommandHandler<CreateQuestionCommand> {
  async execute(command: CreateQuestionCommand): Promise<CreateQuestionResponse> {
    const newEntity = Question.create({
      fullName: command.fullName,
      phoneNumber: command.phoneNumber,
      question: command.question,
      status: command.status,
    });
    await Question.save(newEntity);
    return plainToInstance(CreateQuestionResponse, newEntity, {excludeExtraneousValues: true});
  }
}
