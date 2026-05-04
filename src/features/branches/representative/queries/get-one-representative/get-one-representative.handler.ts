import {QueryHandler, IQueryHandler} from "@nestjs/cqrs";
import {GetOneRepresentativeQuery} from "./get-one-representative.query";
import {GetOneRepresentativeResponse} from "./get-one-representative.response";
import {Representative} from "@/features/branches/representative/representative.entity";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";

@QueryHandler(GetOneRepresentativeQuery)
export class GetOneRepresentativeHandler implements IQueryHandler<GetOneRepresentativeQuery> {
  async execute(query: GetOneRepresentativeQuery): Promise<GetOneRepresentativeResponse> {
    const representative = await Representative.findOne({ where: { id: query.id } });

    if (!representative) {
      throw new NotFoundException("Representative not found");
    }

    return plainToInstance(GetOneRepresentativeResponse, representative, {excludeExtraneousValues: true});
  }
}
