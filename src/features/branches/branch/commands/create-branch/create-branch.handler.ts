import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateBranchCommand} from "./create-branch.command";
import {CreateBranchResponse} from "./create-branch.response";
import {Branch} from "@/features/branches/branch/branch.entity";
import {plainToInstance} from "class-transformer";
import {Country} from "@/features/branches/country/country.entity";
import {Representative} from "@/features/branches/representative/representative.entity";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(CreateBranchCommand)
export class CreateBranchHandler implements ICommandHandler<CreateBranchCommand> {
  async execute(cmd: CreateBranchCommand): Promise<CreateBranchResponse> {
    const countryExists = await Country.existsBy({id: cmd.countryId});
    if (!countryExists) {
      throw new NotFoundException("Country with given id not found");
    }

    const representativeExists = await Representative.existsBy({id: cmd.representativeId});
    if (!representativeExists) {
      throw new NotFoundException("Representative with given id not found");
    }

    const newBranch = Branch.create({
      countryId: cmd.countryId,
      representativeId: cmd.representativeId,
      city: cmd.city,
      latitude: cmd.latitude,
      longitude: cmd.longitude,
      phoneNumber: cmd.phoneNumber
    });
    
    await Branch.save(newBranch);
    return plainToInstance(CreateBranchResponse, newBranch, {excludeExtraneousValues: true});
  }
}
