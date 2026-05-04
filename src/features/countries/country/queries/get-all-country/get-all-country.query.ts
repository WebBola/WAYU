import { Query } from "@nestjs/cqrs";
import { GetAllCountryFilters } from "./get-all-country.filters";
import { GetAllCountryResponse } from "./get-all-country.response";

export class GetAllCountryQuery extends Query<GetAllCountryResponse[]> {
    constructor(public readonly filters: GetAllCountryFilters) {
        super()
    }
}