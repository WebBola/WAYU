import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteBranchCommand} from "./delete-branch.command";
import {Branch} from "@/features/branches/branch/branch.entity";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(DeleteBranchCommand)
export class DeleteBranchHandler implements ICommandHandler<DeleteBranchCommand> {
  async execute(cmd: DeleteBranchCommand): Promise<void> {
    const branch = await Branch.findOne({ where: { id: cmd.id } });
    
    if (!branch) {
      throw new NotFoundException("Branch not found");
    }

    await Branch.remove(branch);
  }
}
