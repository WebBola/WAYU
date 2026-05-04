import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetOneInstagramPostQuery} from "./get-one-instagram-post.query";
import {GetOneInstagramPostResponse} from "./get-one-instagram-post.response";
import {InstagramPost} from "@/features/instagram-posts/instagram-post/instagram-post.entity";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";

@QueryHandler(GetOneInstagramPostQuery)
export class GetOneInstagramPostHandler implements IQueryHandler<GetOneInstagramPostQuery> {
  async execute(query: GetOneInstagramPostQuery): Promise<GetOneInstagramPostResponse> {
    const post = await InstagramPost.findOne({ where: { id: query.id } });

    if (!post) {
      throw new NotFoundException("Instagram post not found");
    }

    return plainToInstance(GetOneInstagramPostResponse, post, {excludeExtraneousValues: true});
  }
}
