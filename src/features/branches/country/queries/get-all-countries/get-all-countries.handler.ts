import {QueryHandler, IQueryHandler} from "@nestjs/cqrs";
import {GetAllCountriesQuery} from "./get-all-countries.query";
import {GetAllCountriesResponse} from "./get-all-countries.response";
import {Country} from "@/features/branches/country/country.entity";
import {plainToInstance} from "class-transformer";

@QueryHandler(GetAllCountriesQuery)
export class GetAllCountriesHandler implements IQueryHandler<GetAllCountriesQuery> {
  async execute(query: GetAllCountriesQuery): Promise<GetAllCountriesResponse[]> {
    const where: any = {};
    
    if (query.filters.name) {
      where.title = query.filters.name;
    }

    const countries = await Country.find({
      where,
      order: {createdAt: 'DESC'}
    });

    return plainToInstance(GetAllCountriesResponse, countries, {excludeExtraneousValues: true});
  }
}
