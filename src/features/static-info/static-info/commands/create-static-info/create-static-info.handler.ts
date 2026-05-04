import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateStaticInfoCommand} from "./create-static-info.command";
import {CreateStaticInfoResponse} from "./create-static-info.response";
import {StaticInfo} from "../../static-info.entity";
import {plainToInstance} from "class-transformer";

@CommandHandler(CreateStaticInfoCommand)
export class CreateStaticInfoHandler implements ICommandHandler<CreateStaticInfoCommand> {
  async execute(command: CreateStaticInfoCommand): Promise<CreateStaticInfoResponse> {
    const newEntity = StaticInfo.create({
      appStoreLink: command.appStoreLink || null,
      playMarketLink: command.playMarketLink || null,
      aboutUs: command.aboutUs || '',
    });
    await StaticInfo.save(newEntity);
    return plainToInstance(CreateStaticInfoResponse, newEntity, {excludeExtraneousValues: true});
  }
}
