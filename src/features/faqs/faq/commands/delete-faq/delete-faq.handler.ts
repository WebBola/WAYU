import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteFaqCommand} from "./delete-faq.command";
import {Faq} from "@/features/faqs/faq/faq.entity";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(DeleteFaqCommand)
export class DeleteFaqHandler implements ICommandHandler<DeleteFaqCommand> {
  async execute(cmd: DeleteFaqCommand): Promise<void> {
    const faq = await Faq.findOne({ where: { id: cmd.id } });
    
    if (!faq) {
      throw new NotFoundException("FAQ not found");
    }

    await Faq.remove(faq);
  }
}
