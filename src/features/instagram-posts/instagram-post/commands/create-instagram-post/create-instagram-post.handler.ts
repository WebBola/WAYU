import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateInstagramPostCommand} from "./create-instagram-post.command";
import {CreateInstagramPostResponse} from "./create-instagram-post.response";
import {InstagramPost} from "../../instagram-post.entity";
import {plainToInstance} from "class-transformer";

@CommandHandler(CreateInstagramPostCommand)
export class CreateInstagramPostHandler implements ICommandHandler<CreateInstagramPostCommand> {
  async execute(command: CreateInstagramPostCommand): Promise<CreateInstagramPostResponse> {
    const newEntity = InstagramPost.create({
      link: command.link,
      image: command.image.path,
    });
    await InstagramPost.save(newEntity);
    return plainToInstance(CreateInstagramPostResponse, newEntity, {excludeExtraneousValues: true});
  }
}
