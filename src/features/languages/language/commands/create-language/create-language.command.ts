import { Command } from "@nestjs/cqrs";
import { CreateLanguageResponse } from "@/features/languages/language/commands/create-language/create-language.response";

export class CreateLanguageCommand extends Command<CreateLanguageResponse> {
    constructor(public title: string) {
        super();
    }
}
