import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdateInstagramPostCommand} from "./update-instagram-post.command";
import {UpdateInstagramPostResponse} from "./update-instagram-post.response";
import {InstagramPost} from "@/features/instagram-posts/instagram-post/instagram-post.entity";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(UpdateInstagramPostCommand)
export class UpdateInstagramPostHandler implements ICommandHandler<UpdateInstagramPostCommand> {
  async execute(cmd: UpdateInstagramPostCommand): Promise<UpdateInstagramPostResponse> {
    const post = await InstagramPost.findOne({ where: { id: cmd.id } });
    
    if (!post) {
      throw new NotFoundException("Instagram post not found");
    }

    if (cmd.link) post.link = cmd.link;
    if (cmd.image) post.image = cmd.image.path;

    await InstagramPost.save(post);
    return plainToInstance(UpdateInstagramPostResponse, post, {excludeExtraneousValues: true});
  }
}
