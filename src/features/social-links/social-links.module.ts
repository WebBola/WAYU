import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SocialLinkController } from './social-link/social-link.controller';
import { CreateSocialLinkHandler } from './social-link/commands/create-social-link/create-social-link.handler';
import { UpdateSocialLinkHandler } from './social-link/commands/update-social-link/update-social-link.handler';
import { DeleteSocialLinkHandler } from './social-link/commands/delete-social-link/delete-social-link.handler';
import { GetAllSocialLinksHandler } from './social-link/queries/get-all-social-links/get-all-social-links.handler';
import { GetOneSocialLinkHandler } from './social-link/queries/get-one-social-link/get-one-social-link.handler';

@Module({
  imports: [CqrsModule],
  controllers: [SocialLinkController],
  providers: [
    CreateSocialLinkHandler,
    UpdateSocialLinkHandler,
    DeleteSocialLinkHandler,
    GetAllSocialLinksHandler,
    GetOneSocialLinkHandler,
  ],
})
export class SocialLinksModule {}
