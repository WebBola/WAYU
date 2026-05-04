import {QueryHandler, IQueryHandler} from "@nestjs/cqrs";
import {GetOneCountryQuery} from "./get-one-country.query";
import {GetOneCountryResponse} from "./get-one-country.response";
import {Country} from "@/features/branches/country/country.entity";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";

@QueryHandler(GetOneCountryQuery)
export class GetOneCountryHandler implements IQueryHandler<GetOneCountryQuery> {
  async execute(query: GetOneCountryQuery): Promise<GetOneCountryResponse> {
    const country = await Country.findOne({ where: { id: query.id } });

    if (!country) {
      throw new NotFoundException("Country not found");
    }

    return plainToInstance(GetOneCountryResponse, country, {excludeExtraneousValues: true});
  }
}
