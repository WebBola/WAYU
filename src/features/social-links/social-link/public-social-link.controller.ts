import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { GetAllSocialLinksResponse } from "./queries/get-all-social-links/get-all-social-links.response";
import { GetAllSocialLinksQuery } from "./queries/get-all-social-links/get-all-social-links.query";
import { GetOneSocialLinkResponse } from "./queries/get-one-social-link/get-one-social-link.response";
import { GetOneSocialLinkQuery } from "./queries/get-one-social-link/get-one-social-link.query";

@ApiTags('Public Social Links')
@Controller('public/social-links')
export class PublicSocialLinkController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetAllSocialLinksResponse] })
  async getAllSocialLinks() {
    return await this.queryBus.execute(new GetAllSocialLinksQuery());
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneSocialLinkResponse })
  async getOneSocialLink(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneSocialLinkQuery(id));
  }
}
