import { ApiProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"

export class UpdateCountryResponse {
    @Expose()
    @ApiProperty()
    id!: number

    @Expose()
    @ApiProperty()
    title!: string

    @Expose()
    @ApiProperty()
    flag!: string
}