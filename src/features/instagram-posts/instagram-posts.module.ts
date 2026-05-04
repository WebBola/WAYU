import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InstagramPostController } from './instagram-post/instagram-post.controller';
import { PublicInstagramPostController } from './instagram-post/public-instagram-post.controller';
import { CreateInstagramPostHandler } from './instagram-post/commands/create-instagram-post/create-instagram-post.handler';
import { UpdateInstagramPostHandler } from './instagram-post/commands/update-instagram-post/update-instagram-post.handler';
import { DeleteInstagramPostHandler } from './instagram-post/commands/delete-instagram-post/delete-instagram-post.handler';
import { GetAllInstagramPostsHandler } from './instagram-post/queries/get-all-instagram-posts/get-all-instagram-posts.handler';
import { GetOneInstagramPostHandler } from './instagram-post/queries/get-one-instagram-post/get-one-instagram-post.handler';

@Module({
  imports: [CqrsModule],
  controllers: [InstagramPostController, PublicInstagramPostController],
  providers: [
    CreateInstagramPostHandler,
    UpdateInstagramPostHandler,
    DeleteInstagramPostHandler,
    GetAllInstagramPostsHandler,
    GetOneInstagramPostHandler,
  ],
})
export class InstagramPostsModule {}
