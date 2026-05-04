import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetAllFaqsQuery} from "./get-all-faqs.query";
import {GetAllFaqsResponse} from "./get-all-faqs.response";
import {Faq} from "@/features/faqs/faq/faq.entity";
import {plainToInstance} from "class-transformer";

@QueryHandler(GetAllFaqsQuery)
export class GetAllFaqsHandler implements IQueryHandler<GetAllFaqsQuery> {
  async execute(query: GetAllFaqsQuery): Promise<GetAllFaqsResponse[]> {
    const where: any = {};
    
    if (query.filters.search) {
      where.question = { $like: `%${query.filters.search}%` };
    }

    const faqs = await Faq.find({
      where,
      order: {createdAt: 'DESC'},
      relations: ['tags']
    });

    return plainToInstance(GetAllFaqsResponse, faqs, {excludeExtraneousValues: true});
  }
}
