import {Command} from "@nestjs/cqrs";
import {CreateInstagramPostResponse} from "./create-instagram-post.response";

export class CreateInstagramPostCommand extends Command<CreateInstagramPostResponse> {
  constructor(
    public readonly link: string,
    public readonly image: Express.Multer.File,
  ) {
    super();
  }
}
