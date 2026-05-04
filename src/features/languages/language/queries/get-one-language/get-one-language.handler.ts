import {plainToInstance} from "class-transformer";
import {Language} from "@/features/languages/language/language.entity";
import {GetOneLanguageQuery} from "./get-one-language.query";
import {GetOneLanguageResponse} from "./get-one-language.response";
import type {IQueryHandler} from "@nestjs/cqrs";
import {QueryHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";

@QueryHandler(GetOneLanguageQuery)
export class GetOneLanguageHandler implements IQueryHandler<GetOneLanguageQuery> {
  async execute(query: GetOneLanguageQuery): Promise<GetOneLanguageResponse> {
    const language = await Language.findOneBy({id: query.id});
    if (!language)
        throw new NotFoundException("Language not found");

    return plainToInstance(GetOneLanguageResponse, language, {excludeExtraneousValues: true});
  }
}
