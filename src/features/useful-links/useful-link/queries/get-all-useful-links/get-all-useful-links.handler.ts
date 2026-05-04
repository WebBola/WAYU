import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetAllUsefulLinksQuery} from "./get-all-useful-links.query";
import {GetAllUsefulLinksResponse} from "./get-all-useful-links.response";
import {UsefulLink} from "@/features/useful-links/useful-link/useful-link.entity";
import {plainToInstance} from "class-transformer";

@QueryHandler(GetAllUsefulLinksQuery)
export class GetAllUsefulLinksHandler implements IQueryHandler<GetAllUsefulLinksQuery> {
  async execute(): Promise<GetAllUsefulLinksResponse[]> {
    const usefulLinks = await UsefulLink.find({
      order: {createdAt: 'DESC'}
    });

    return plainToInstance(GetAllUsefulLinksResponse, usefulLinks, {excludeExtraneousValues: true});
  }
}
