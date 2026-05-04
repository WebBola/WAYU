import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { StaticInfoController } from './static-info/static-info.controller';
import { PublicStaticInfoController } from './static-info/public-static-info.controller';
import { CreateStaticInfoHandler } from './static-info/commands/create-static-info/create-static-info.handler';

@Module({
  imports: [CqrsModule],
  controllers: [StaticInfoController, PublicStaticInfoController],
  providers: [CreateStaticInfoHandler],
})
export class StaticInfoModule {}
