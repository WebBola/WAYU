import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VacancyController } from './vacancy/vacancy.controller';
import { CreateVacancyHandler } from './vacancy/commands/create-vacancy/create-vacancy.handler';
import { UpdateVacancyHandler } from './vacancy/commands/update-vacancy/update-vacancy.handler';
import { DeleteVacancyHandler } from './vacancy/commands/delete-vacancy/delete-vacancy.handler';
import { GetAllVacanciesHandler } from './vacancy/queries/get-all-vacancies/get-all-vacancies.handler';
import { GetOneVacancyHandler } from './vacancy/queries/get-one-vacancy/get-one-vacancy.handler';
import { ApplicationController } from './application/application.controller';
import { CreateApplicationHandler } from './application/commands/create-application/create-application.handler';
import { UpdateApplicationHandler } from './application/commands/update-application/update-application.handler';
import { DeleteApplicationHandler } from './application/commands/delete-application/delete-application.handler';
import { GetAllApplicationsHandler } from './application/queries/get-all-applications/get-all-applications.handler';
import { GetOneApplicationHandler } from './application/queries/get-one-application/get-one-application.handler';

@Module({
  imports: [CqrsModule],
  controllers: [VacancyController, ApplicationController],
  providers: [
    CreateVacancyHandler,
    UpdateVacancyHandler,
    DeleteVacancyHandler,
    GetAllVacanciesHandler,
    GetOneVacancyHandler,

    CreateApplicationHandler,
    UpdateApplicationHandler,
    DeleteApplicationHandler,
    GetAllApplicationsHandler,
    GetOneApplicationHandler
  ],
})
export class VacanciesModule {}
