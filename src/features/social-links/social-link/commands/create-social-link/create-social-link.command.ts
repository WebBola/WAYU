import {Command} from "@nestjs/cqrs";
import {CreateSocialLinkResponse} from "./create-social-link.response";

export class CreateSocialLinkCommand extends Command<CreateSocialLinkResponse> {
  constructor(
    public readonly title: string,
    public readonly link: string,
    public readonly icon: Express.Multer.File,
  ) {
    super();
  }
}
