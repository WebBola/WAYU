import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetAllSocialLinksQuery} from "./get-all-social-links.query";
import {GetAllSocialLinksResponse} from "./get-all-social-links.response";
import {SocialLink} from "@/features/social-links/social-link/social-link.entity";
import {plainToInstance} from "class-transformer";

@QueryHandler(GetAllSocialLinksQuery)
export class GetAllSocialLinksHandler implements IQueryHandler<GetAllSocialLinksQuery> {
  async execute(): Promise<GetAllSocialLinksResponse[]> {
    const socialLinks = await SocialLink.find({
      order: {createdAt: 'DESC'}
    });

    return plainToInstance(GetAllSocialLinksResponse, socialLinks, {excludeExtraneousValues: true});
  }
}
