import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateRepresentativeCommand} from "./create-representative.command";
import {CreateRepresentativeResponse} from "./create-representative.response";
import {Representative} from "@/features/branches/representative/representative.entity";
import {plainToInstance} from "class-transformer";

@CommandHandler(CreateRepresentativeCommand)
export class CreateRepresentativeHandler implements ICommandHandler<CreateRepresentativeCommand> {
  async execute(command: CreateRepresentativeCommand): Promise<CreateRepresentativeResponse> {
    const newRepresentative = new Representative();
    newRepresentative.fullName = command.fullName;
    newRepresentative.image = command.image;
    newRepresentative.email = command.email;
    newRepresentative.phoneNumber = command.phoneNumber;
    newRepresentative.resume = command.resume;

    await Representative.save(newRepresentative);
    return plainToInstance(CreateRepresentativeResponse, newRepresentative, {excludeExtraneousValues: true});
  }
}
