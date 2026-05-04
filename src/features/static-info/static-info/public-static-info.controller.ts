import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { CreateStaticInfoResponse } from "./commands/create-static-info/create-static-info.response";

@ApiTags('Public Static Info')
@Controller('public/static-info')
export class PublicStaticInfoController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [CreateStaticInfoResponse] })
  async getAllStaticInfo() {
    return await this.queryBus.execute({});
  }

  @Get(':id')
  @ApiOkResponse({ type: CreateStaticInfoResponse })
  async getOneStaticInfo(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute({}); 
  }
}
