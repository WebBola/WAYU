import {plainToInstance} from "class-transformer";
import {Language} from "@/features/languages/language/language.entity";
import {GetAllLanguagesQuery} from "./get-all-languages.query";
import {GetAllLanguagesResponse} from "./get-all-languages.response";
import type {IQueryHandler} from "@nestjs/cqrs";
import {QueryHandler} from "@nestjs/cqrs";

@QueryHandler(GetAllLanguagesQuery)
export class GetAllLanguagesHandler implements IQueryHandler<GetAllLanguagesQuery> {
  async execute(query: GetAllLanguagesQuery): Promise<GetAllLanguagesResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const languages = await Language.find({skip: skip, take: take});
    return plainToInstance(GetAllLanguagesResponse, languages, {excludeExtraneousValues: true});
  }
}
