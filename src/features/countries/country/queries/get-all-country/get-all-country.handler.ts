import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllCountryQuery } from "./get-all-country.query";
import { GetAllCountryResponse } from "./get-all-country.response";
import { Country } from "@/core/entities/country.entity";
import { plainToInstance } from "class-transformer";

@QueryHandler(GetAllCountryQuery)
export class GetAllCountryHandler implements IQueryHandler<GetAllCountryQuery> {
    async execute(query: GetAllCountryQuery): Promise<GetAllCountryResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const countries = await Country.find({ skip: skip, take: take });
        return plainToInstance(GetAllCountryResponse, countries, { excludeExtraneousValues: true });
    }
}                                                                                                                                                                                                                                                                 