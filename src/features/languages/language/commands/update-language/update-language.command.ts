import { Command } from "@nestjs/cqrs";
import { UpdateLanguageResponse } from "./update-language.response";

export class UpdateLanguageCommand extends Command<UpdateLanguageResponse> {
    public id!: number;
    
    constructor(public title?: string) {
        super();
    }
}
