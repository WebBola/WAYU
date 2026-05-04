import {Command} from "@nestjs/cqrs";
import {UpdateInstagramPostResponse} from "./update-instagram-post.response";

export class UpdateInstagramPostCommand extends Command<UpdateInstagramPostResponse> {
  public id!: number;

  constructor(
    public link?: string,
    public image?: Express.Multer.File,
  ) {
    super();
  }
}
