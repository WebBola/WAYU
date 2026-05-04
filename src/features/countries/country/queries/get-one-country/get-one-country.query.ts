import { Query } from "@nestjs/cqrs";
import { GetOneCountryResponse } from "./get-one-country.response";

export class GetOneCountryQuery extends Query<GetOneCountryResponse>{
    constructor(public readonly id: number){
        super();
    }
}