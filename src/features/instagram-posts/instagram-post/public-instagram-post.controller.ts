import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { GetAllInstagramPostsResponse } from "./queries/get-all-instagram-posts/get-all-instagram-posts.response";
import { GetAllInstagramPostsQuery } from "./queries/get-all-instagram-posts/get-all-instagram-posts.query";
import { GetOneInstagramPostResponse } from "./queries/get-one-instagram-post/get-one-instagram-post.response";
import { GetOneInstagramPostQuery } from "./queries/get-one-instagram-post/get-one-instagram-post.query";

@ApiTags('Public Instagram Posts')
@Controller('public/instagram-posts')
export class PublicInstagramPostController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetAllInstagramPostsResponse] })
  async getAllInstagramPosts() {
    return await this.queryBus.execute(new GetAllInstagramPostsQuery());
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneInstagramPostResponse })
  async getOneInstagramPost(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneInstagramPostQuery(id));
  }
}
