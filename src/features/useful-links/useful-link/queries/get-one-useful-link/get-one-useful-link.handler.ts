import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetOneUsefulLinkQuery} from "./get-one-useful-link.query";
import {GetOneUsefulLinkResponse} from "./get-one-useful-link.response";
import {UsefulLink} from "@/features/useful-links/useful-link/useful-link.entity";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";

@QueryHandler(GetOneUsefulLinkQuery)
export class GetOneUsefulLinkHandler implements IQueryHandler<GetOneUsefulLinkQuery> {
  async execute(query: GetOneUsefulLinkQuery): Promise<GetOneUsefulLinkResponse> {
    const usefulLink = await UsefulLink.findOne({ where: { id: query.id } });

    if (!usefulLink) {
      throw new NotFoundException("Useful link not found");
    }

    return plainToInstance(GetOneUsefulLinkResponse, usefulLink, {excludeExtraneousValues: true});
  }
}
