import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";

export class GetAllCountryFilters {
    @IsInt()
    @IsOptional()
    @Type(() => Number)
    @ApiProperty({ required: false })
    page?: number

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    @ApiProperty({ required: false })
    size?: number
}