import { Command } from "@nestjs/cqrs"
import { UpdateCountryResponse } from "./update-country.response"

export class UpdateCountryCommand extends Command<UpdateCountryResponse> {
    public id!: number;
    
    constructor(public title?: string, public flag?: Express.Multer.File) {
        super();
    }
}