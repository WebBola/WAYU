import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { GetAllUsefulLinksResponse } from "./queries/get-all-useful-links/get-all-useful-links.response";
import { GetAllUsefulLinksQuery } from "./queries/get-all-useful-links/get-all-useful-links.query";
import { GetOneUsefulLinkResponse } from "./queries/get-one-useful-link/get-one-useful-link.response";
import { GetOneUsefulLinkQuery } from "./queries/get-one-useful-link/get-one-useful-link.query";

@ApiTags('Public Useful Links')
@Controller('public/useful-links')
export class PublicUsefulLinkController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetAllUsefulLinksResponse] })
  async getAllUsefulLinks() {
    return await this.queryBus.execute(new GetAllUsefulLinksQuery());
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneUsefulLinkResponse })
  async getOneUsefulLink(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneUsefulLinkQuery(id));
  }
}
