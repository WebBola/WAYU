import {QueryHandler, IQueryHandler} from "@nestjs/cqrs";
import {GetAllApplicationsQuery} from "./get-all-applications.query";
import {GetAllApplicationsResponse} from "./get-all-applications.response";
import {Application} from "@/features/vacancies/application/application.entity";
import {plainToInstance} from "class-transformer";

@QueryHandler(GetAllApplicationsQuery)
export class GetAllApplicationsHandler implements IQueryHandler<GetAllApplicationsQuery> {
  async execute(query: GetAllApplicationsQuery): Promise<GetAllApplicationsResponse[]> {
    const where: any = {};
    
    if (query.filters.fullName) {
      where.fullName = query.filters.fullName;
    }

    const applications = await Application.find({
      where,
      order: {createdAt: 'DESC'}
    });

    return plainToInstance(GetAllApplicationsResponse, applications, {excludeExtraneousValues: true});
  }
}
