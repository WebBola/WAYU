import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GetAllCountryResponse } from "./queries/get-all-country/get-all-country.response";
import { GetAllCountryFilters } from "./queries/get-all-country/get-all-country.filters";
import { GetAllCountryQuery } from "./queries/get-all-country/get-all-country.query";
import { GetOneCountryResponse } from "./queries/get-one-country/get-one-country.response";
import { GetOneCountryQuery } from "./queries/get-one-country/get-one-country.query";
import { CreateCountryResponse } from "./commands/create-country/create-country.response";
import { CreateCountryCommand } from "./commands/create-country/create-country.command";
import { UpdateCountryCommand } from "./commands/update-country/update-country.command";
import { UpdateCountryResponse } from "./commands/update-country/update-country.response";
import { DeleteCountryCommand } from "./commands/delete-country/delete-country.command";
import { ApiConsumes } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateCountryRequest } from "./commands/create-country/create-country.request";
import { UpdateCountryRequest } from "./commands/update-country/update-country.request";
import { storageOptions } from "@/configs/multer.config";
import fs from 'fs';

@ApiTags("Countries")
@Controller("admin/country")
export class CountryController {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) { }

    @Get()
    @ApiOkResponse({ type: [GetAllCountryResponse] })
    async getAllCountries(@Query() filters: GetAllCountryFilters) {
        return await this.queryBus.execute(new GetAllCountryQuery(filters))
    }

    @Get(":id")
    @ApiOkResponse({ type: GetOneCountryResponse })
    async getOneCountry(@Param("id", ParseIntPipe) id: number) {
        return await this.queryBus.execute(new GetOneCountryQuery(id))
    }

    @Post()
    @ApiConsumes("multipart/form-data")
    @UseInterceptors(FileInterceptor('flag', {storage: storageOptions, limits: {fileSize: 1024 * 1024 * 5}}))
    async createCountry(@Body() payload: CreateCountryRequest, @UploadedFile() flag: Express.Multer.File) {
        const command = new CreateCountryCommand(payload.title, flag);
        try {
            return await this.commandBus.execute(command);
        } catch (exc) {
            if (fs.existsSync(flag.path))
                fs.rmSync(flag.path);
            throw exc;
        }
    }

    @Patch(":id")
    @ApiConsumes("multipart/form-data")
    @UseInterceptors(FileInterceptor('flag', {storage: storageOptions, limits: {fileSize: 1024 * 1024 * 5}}))
    async updateCountry(@Param("id", ParseIntPipe) id: number, @Body() payload: UpdateCountryRequest, @UploadedFile() flag?: Express.Multer.File) {
        const command = new UpdateCountryCommand(payload.title, flag);
        command.id = id;
        try {
            return await this.commandBus.execute(command);
        } catch (exc) {
            if (flag && fs.existsSync(flag.path))
                fs.rmSync(flag.path);
            throw exc;
        }
    }

    @Delete(":id")
    @ApiOkResponse()
    async deleteCountry(@Param("id", ParseIntPipe) id: number) {
        const cmd = new DeleteCountryCommand();
        cmd.id = id;
        return await this.commandBus.execute(cmd)
    }
}