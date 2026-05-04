import {Command} from "@nestjs/cqrs";
import {CreateFaqResponse} from "./create-faq.response";

export class CreateFaqCommand extends Command<CreateFaqResponse> {
    constructor(
      public question: string, 
      public answer: string, 
      public tagIds?: number[]
    ) {
        super();
    }
}
