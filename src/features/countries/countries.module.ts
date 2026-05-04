import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateCountryHandler } from './country/commands/create-country/create-country.handler';
import { UpdateCountryHandler } from './country/commands/update-country/update-country.handler';
import { DeleteCountryHandler } from './country/commands/delete-country/delete-country.handler';
import { GetAllCountryHandler } from './country/queries/get-all-country/get-all-country.handler';
import { GetOneCountryHandler } from './country/queries/get-one-country/get-one-country.handler';
import { CountryController } from './country/country.controller';
import { PublicCountryController } from './country/public-country.controller';

@Module({
  imports: [CqrsModule],
  controllers: [CountryController, PublicCountryController],
  providers: [CreateCountryHandler, UpdateCountryHandler, DeleteCountryHandler, GetAllCountryHandler, GetOneCountryHandler],
})
export class CountriesModule { }
