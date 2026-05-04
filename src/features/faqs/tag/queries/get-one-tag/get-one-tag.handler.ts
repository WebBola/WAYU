import {QueryHandler, IQueryHandler} from "@nestjs/cqrs";
import {GetOneTagQuery} from "./get-one-tag.query";
import {GetOneTagResponse} from "./get-one-tag.response";
import {Tag} from "@/features/faqs/tag/tag.entity";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";

@QueryHandler(GetOneTagQuery)
export class GetOneTagHandler implements IQueryHandler<GetOneTagQuery> {
  async execute(query: GetOneTagQuery): Promise<GetOneTagResponse> {
    const tag = await Tag.findOne({ where: { id: query.id } });

    if (!tag) {
      throw new NotFoundException("Tag not found");
    }

    return plainToInstance(GetOneTagResponse, tag, {excludeExtraneousValues: true});
  }
}
