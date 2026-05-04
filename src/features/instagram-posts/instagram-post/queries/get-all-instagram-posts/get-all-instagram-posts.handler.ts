import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetAllInstagramPostsQuery} from "./get-all-instagram-posts.query";
import {GetAllInstagramPostsResponse} from "./get-all-instagram-posts.response";
import {InstagramPost} from "@/features/instagram-posts/instagram-post/instagram-post.entity";
import {plainToInstance} from "class-transformer";

@QueryHandler(GetAllInstagramPostsQuery)
export class GetAllInstagramPostsHandler implements IQueryHandler<GetAllInstagramPostsQuery> {
  async execute(): Promise<GetAllInstagramPostsResponse[]> {
    const posts = await InstagramPost.find({
      order: {createdAt: 'DESC'}
    });

    return plainToInstance(GetAllInstagramPostsResponse, posts, {excludeExtraneousValues: true});
  }
}
