import {Command} from "@nestjs/cqrs";
import {CreateEventResponse} from "./create-event.response";

export class CreateEventCommand extends Command<CreateEventResponse> {
    constructor(
      public categoryId: number, 
      public title: string, 
      public content: string, 
      public image: Express.Multer.File, 
      public date: string, 
      public address: string
    ) {
        super();
    }
}
