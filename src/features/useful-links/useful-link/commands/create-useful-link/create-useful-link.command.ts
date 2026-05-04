import {Command} from "@nestjs/cqrs";
import {CreateUsefulLinkResponse} from "./create-useful-link.response";

export class CreateUsefulLinkCommand extends Command<CreateUsefulLinkResponse> {
  constructor(
    public readonly title: string,
    public readonly link: string,
    public readonly icon: Express.Multer.File,
  ) {
    super();
  }
}
