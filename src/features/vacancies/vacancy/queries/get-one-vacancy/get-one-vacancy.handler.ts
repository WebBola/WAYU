import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetOneVacancyQuery} from "./get-one-vacancy.query";
import {GetOneVacancyResponse} from "./get-one-vacancy.response";
import {Vacancy} from "@/features/vacancies/vacancy/vacancy.entity";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";

@QueryHandler(GetOneVacancyQuery)
export class GetOneVacancyHandler implements IQueryHandler<GetOneVacancyQuery> {
  async execute(query: GetOneVacancyQuery): Promise<GetOneVacancyResponse> {
    const vacancy = await Vacancy.findOne({ where: { id: query.id } });

    if (!vacancy) {
      throw new NotFoundException("Vacancy not found");
    }

    return plainToInstance(GetOneVacancyResponse, vacancy, {excludeExtraneousValues: true});
  }
}
