import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetOneCountryQuery } from "./get-one-country.query";
import { GetOneCountryResponse } from "./get-one-country.response";
import { Country } from "../../country.entity";
import { NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

@QueryHandler(GetOneCountryQuery)
export class GetOneCountryHandler implements IQueryHandler<GetOneCountryQuery>{
    async execute(query: GetOneCountryQuery): Promise<GetOneCountryResponse>{
        const country = await Country.findOneBy({id: query.id})
        if(!country)
            throw new NotFoundException("Country not found")

        return plainToInstance(GetOneCountryResponse,country,{excludeExtraneousValues:true})
    }
}