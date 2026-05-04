import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetOneSocialLinkQuery} from "./get-one-social-link.query";
import {GetOneSocialLinkResponse} from "./get-one-social-link.response";
import {SocialLink} from "@/features/social-links/social-link/social-link.entity";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";

@QueryHandler(GetOneSocialLinkQuery)
export class GetOneSocialLinkHandler implements IQueryHandler<GetOneSocialLinkQuery> {
  async execute(query: GetOneSocialLinkQuery): Promise<GetOneSocialLinkResponse> {
    const socialLink = await SocialLink.findOne({ where: { id: query.id } });

    if (!socialLink) {
      throw new NotFoundException("Social link not found");
    }

    return plainToInstance(GetOneSocialLinkResponse, socialLink, {excludeExtraneousValues: true});
  }
}
