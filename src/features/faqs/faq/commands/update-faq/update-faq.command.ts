import {Command} from "@nestjs/cqrs";
import {UpdateFaqResponse} from "./update-faq.response";

export class UpdateFaqCommand extends Command<UpdateFaqResponse> {
  public id!: number;

  constructor(
    public question?: string,
    public answer?: string,
    public tagIds?: number[]
  ) {
    super();
  }
}
