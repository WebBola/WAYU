import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteInstagramPostCommand} from "./delete-instagram-post.command";
import {InstagramPost} from "@/features/instagram-posts/instagram-post/instagram-post.entity";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(DeleteInstagramPostCommand)
export class DeleteInstagramPostHandler implements ICommandHandler<DeleteInstagramPostCommand> {
  async execute(cmd: DeleteInstagramPostCommand): Promise<void> {
    const post = await InstagramPost.findOne({ where: { id: cmd.id } });
    
    if (!post) {
      throw new NotFoundException("Instagram post not found");
    }

    await InstagramPost.remove(post);
  }
}
