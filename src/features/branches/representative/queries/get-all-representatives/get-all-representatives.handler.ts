import {QueryHandler, IQueryHandler} from "@nestjs/cqrs";
import {GetAllRepresentativesQuery} from "./get-all-representatives.query";
import {GetAllRepresentativesResponse} from "./get-all-representatives.response";
import {Representative} from "@/features/branches/representative/representative.entity";
import {plainToInstance} from "class-transformer";

@QueryHandler(GetAllRepresentativesQuery)
export class GetAllRepresentativesHandler implements IQueryHandler<GetAllRepresentativesQuery> {
  async execute(query: GetAllRepresentativesQuery): Promise<GetAllRepresentativesResponse[]> {
    const where: any = {};
    
    if (query.filters.fullName) {
      where.fullName = query.filters.fullName;
    }

    const representatives = await Representative.find({
      where,
      order: {createdAt: 'DESC'}
    });

    return plainToInstance(GetAllRepresentativesResponse, representatives, {excludeExtraneousValues: true});
  }
}
