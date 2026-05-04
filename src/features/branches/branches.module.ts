import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BranchController } from './branch/branch.controller';
import { PublicBranchController } from './branch/public-branch.controller';
import { CreateBranchHandler } from './branch/commands/create-branch/create-branch.handler';
import { UpdateBranchHandler } from './branch/commands/update-branch/update-branch.handler';
import { DeleteBranchHandler } from './branch/commands/delete-branch/delete-branch.handler';
import { GetAllBranchesHandler } from './branch/queries/get-all-branches/get-all-branches.handler';
import { GetOneBranchHandler } from './branch/queries/get-one-branch/get-one-branch.handler';
import { CountryController } from './country/country.controller';
import { RepresentativeController } from './representative/representative.controller';
import { PublicRepresentativeController } from './representative/public-representative.controller';
import { CreateCountryHandler } from './country/commands/create-country/create-country.handler';
import { UpdateCountryHandler } from './country/commands/update-country/update-country.handler';
import { DeleteCountryHandler } from './country/commands/delete-country/delete-country.handler';
import { GetAllCountriesHandler } from './country/queries/get-all-countries/get-all-countries.handler';
import { GetOneCountryHandler } from './country/queries/get-one-country/get-one-country.handler';
import { CreateRepresentativeHandler } from './representative/commands/create-representative/create-representative.handler';
import { UpdateRepresentativeHandler } from './representative/commands/update-representative/update-representative.handler';
import { DeleteRepresentativeHandler } from './representative/commands/delete-representative/delete-representative.handler';
import { GetAllRepresentativesHandler } from './representative/queries/get-all-representatives/get-all-representatives.handler';
import { GetOneRepresentativeHandler } from './representative/queries/get-one-representative/get-one-representative.handler';

@Module({
  imports: [CqrsModule],
  controllers: [BranchController, PublicBranchController, CountryController, RepresentativeController, PublicRepresentativeController],
  providers: [
    CreateBranchHandler,
    UpdateBranchHandler,
    DeleteBranchHandler,
    GetAllBranchesHandler,
    GetOneBranchHandler,

    CreateCountryHandler,
    UpdateCountryHandler,
    DeleteCountryHandler,
    GetAllCountriesHandler,
    GetOneCountryHandler,

    CreateRepresentativeHandler,
    UpdateRepresentativeHandler,
    DeleteRepresentativeHandler,
    GetAllRepresentativesHandler,
    GetOneRepresentativeHandler
  ],
})
export class BranchesModule { }
