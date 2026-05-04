import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetAllVacanciesQuery} from "./get-all-vacancies.query";
import {GetAllVacanciesResponse} from "./get-all-vacancies.response";
import {Vacancy} from "@/features/vacancies/vacancy/vacancy.entity";
import {plainToInstance} from "class-transformer";

@QueryHandler(GetAllVacanciesQuery)
export class GetAllVacanciesHandler implements IQueryHandler<GetAllVacanciesQuery> {
  async execute(query: GetAllVacanciesQuery): Promise<GetAllVacanciesResponse[]> {
    const where: any = {};
    if (query.filters.type) {
      where.type = query.filters.type;
    }
    if (query.filters.isActive !== undefined) {
      where.isActive = query.filters.isActive;
    }

    const vacancies = await Vacancy.find({
      where,
      order: {createdAt: 'DESC'}
    });

    return plainToInstance(GetAllVacanciesResponse, vacancies, {excludeExtraneousValues: true});
  }
}
