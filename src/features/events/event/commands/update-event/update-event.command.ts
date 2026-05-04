import {Command} from "@nestjs/cqrs";
import {UpdateEventResponse} from "./update-event.response";

export class UpdateEventCommand extends Command<UpdateEventResponse> {
  public id!: number;

  constructor(
    public categoryId?: number,
    public title?: string,
    public content?: string,
    public image?: Express.Multer.File,
    public date?: string,
    public address?: string,
  ) {
    super();
  }
}
