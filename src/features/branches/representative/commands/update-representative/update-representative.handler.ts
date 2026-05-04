import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdateRepresentativeCommand} from "./update-representative.command";
import {UpdateRepresentativeResponse} from "./update-representative.response";
import {Representative} from "@/features/branches/representative/representative.entity";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(UpdateRepresentativeCommand)
export class UpdateRepresentativeHandler implements ICommandHandler<UpdateRepresentativeCommand> {
  async execute(cmd: UpdateRepresentativeCommand): Promise<UpdateRepresentativeResponse> {
    const representative = await Representative.findOne({ where: { id: cmd.id } });
    
    if (!representative) {
      throw new NotFoundException("Representative not found");
    }

    if (cmd.fullName) representative.fullName = cmd.fullName;
    if (cmd.phoneNumber) representative.phoneNumber = cmd.phoneNumber;

    await Representative.save(representative);
    return plainToInstance(UpdateRepresentativeResponse, representative, {excludeExtraneousValues: true});
  }
}
