import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetOneFaqQuery} from "./get-one-faq.query";
import {GetOneFaqResponse} from "./get-one-faq.response";
import {Faq} from "@/features/faqs/faq/faq.entity";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";

@QueryHandler(GetOneFaqQuery)
export class GetOneFaqHandler implements IQueryHandler<GetOneFaqQuery> {
  async execute(query: GetOneFaqQuery): Promise<GetOneFaqResponse> {
    const faq = await Faq.findOne({
      where: { id: query.id },
      relations: ['tags']
    });

    if (!faq) {
      throw new NotFoundException("FAQ not found");
    }

    return plainToInstance(GetOneFaqResponse, faq, {excludeExtraneousValues: true});
  }
}
