import {QueryHandler, IQueryHandler} from "@nestjs/cqrs";
import {GetOneApplicationQuery} from "./get-one-application.query";
import {GetOneApplicationResponse} from "./get-one-application.response";
import {Application} from "@/features/vacancies/application/application.entity";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";

@QueryHandler(GetOneApplicationQuery)
export class GetOneApplicationHandler implements IQueryHandler<GetOneApplicationQuery> {
  async execute(query: GetOneApplicationQuery): Promise<GetOneApplicationResponse> {
    const application = await Application.findOne({ where: { id: query.id } });

    if (!application) {
      throw new NotFoundException("Application not found");
    }

    return plainToInstance(GetOneApplicationResponse, application, {excludeExtraneousValues: true});
  }
}
