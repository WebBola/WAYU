import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdateFaqCommand} from "./update-faq.command";
import {UpdateFaqResponse} from "./update-faq.response";
import {Faq} from "@/features/faqs/faq/faq.entity";
import {Tag} from "@/features/faqs/tag/tag.entity";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(UpdateFaqCommand)
export class UpdateFaqHandler implements ICommandHandler<UpdateFaqCommand> {
  async execute(cmd: UpdateFaqCommand): Promise<UpdateFaqResponse> {
    const faq = await Faq.findOne({ where: { id: cmd.id }, relations: ['tags'] });
    
    if (!faq) {
      throw new NotFoundException("FAQ not found");
    }

    if (cmd.question) faq.question = cmd.question;
    if (cmd.answer) faq.answer = cmd.answer;
    
    if (cmd.tagIds !== undefined) {
      const tags = await Tag.findByIds(cmd.tagIds);
      faq.tags = tags;
    }

    await Faq.save(faq);
    return plainToInstance(UpdateFaqResponse, faq, {excludeExtraneousValues: true});
  }
}
