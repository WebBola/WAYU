import {Command} from "@nestjs/cqrs";
import {CreateStaticInfoResponse} from "./create-static-info.response";

export class CreateStaticInfoCommand extends Command<CreateStaticInfoResponse> {
  constructor(
    public readonly appStoreLink?: string | null,
    public readonly playMarketLink?: string | null,
    public readonly aboutUs?: string | null,
  ) {
    super();
  }
}
