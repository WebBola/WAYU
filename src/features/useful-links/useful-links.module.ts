import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UsefulLinkController } from './useful-link/useful-link.controller';
import { PublicUsefulLinkController } from './useful-link/public-useful-link.controller';
import { CreateUsefulLinkHandler } from './useful-link/commands/create-useful-link/create-useful-link.handler';
import { UpdateUsefulLinkHandler } from './useful-link/commands/update-useful-link/update-useful-link.handler';
import { DeleteUsefulLinkHandler } from './useful-link/commands/delete-useful-link/delete-useful-link.handler';
import { GetAllUsefulLinksHandler } from './useful-link/queries/get-all-useful-links/get-all-useful-links.handler';
import { GetOneUsefulLinkHandler } from './useful-link/queries/get-one-useful-link/get-one-useful-link.handler';

@Module({
  imports: [CqrsModule],
  controllers: [UsefulLinkController, PublicUsefulLinkController],
  providers: [
    CreateUsefulLinkHandler,
    UpdateUsefulLinkHandler,
    DeleteUsefulLinkHandler,
    GetAllUsefulLinksHandler,
    GetOneUsefulLinkHandler,
  ],
})
export class UsefulLinksModule {}
