import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdateBranchCommand} from "./update-branch.command";
import {UpdateBranchResponse} from "./update-branch.response";
import {Branch} from "@/features/branches/branch/branch.entity";
import {plainToInstance} from "class-transformer";
import {Country} from "@/features/branches/country/country.entity";
import {Representative} from "@/features/branches/representative/representative.entity";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(UpdateBranchCommand)
export class UpdateBranchHandler implements ICommandHandler<UpdateBranchCommand> {
  async execute(cmd: UpdateBranchCommand): Promise<UpdateBranchResponse> {
    const branch = await Branch.findOne({ where: { id: cmd.id } });
    
    if (!branch) {
      throw new NotFoundException("Branch not found");
    }

    if (cmd.countryId) {
      const countryExists = await Country.existsBy({id: cmd.countryId});
      if (!countryExists) {
        throw new NotFoundException("Country with given id not found");
      }
      branch.countryId = cmd.countryId;
    }

    if (cmd.representativeId) {
      const representativeExists = await Representative.existsBy({id: cmd.representativeId});
      if (!representativeExists) {
        throw new NotFoundException("Representative with given id not found");
      }
      branch.representativeId = cmd.representativeId;
    }

    if (cmd.city) branch.city = cmd.city;
    if (cmd.latitude) branch.latitude = cmd.latitude;
    if (cmd.longitude) branch.longitude = cmd.longitude;
    if (cmd.phoneNumber) branch.phoneNumber = cmd.phoneNumber;

    await Branch.save(branch);
    return plainToInstance(UpdateBranchResponse, branch, {excludeExtraneousValues: true});
  }
}
