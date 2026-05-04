import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateFaqCommand} from "./create-faq.command";
import {CreateFaqResponse} from "./create-faq.response";
import {Faq} from "@/features/faqs/faq/faq.entity";
import {Tag} from "@/features/faqs/tag/tag.entity";
import {plainToInstance} from "class-transformer";

@CommandHandler(CreateFaqCommand)
export class CreateFaqHandler implements ICommandHandler<CreateFaqCommand> {
  async execute(cmd: CreateFaqCommand): Promise<CreateFaqResponse> {
    const newFaq = Faq.create({
      question: cmd.question,
      answer: cmd.answer
    });

    if (cmd.tagIds && cmd.tagIds.length > 0) {
      const tags = await Tag.findByIds(cmd.tagIds);
      newFaq.tags = tags;
    }
    
    await Faq.save(newFaq);
    return plainToInstance(CreateFaqResponse, newFaq, {excludeExtraneousValues: true});
  }
}
