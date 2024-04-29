import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator"
import { IsOptional, IsPositive, IsString, IsUrl } from "class-validator"


export class PersonagemDTO {
    @IsString()
    @ApiProperty()
    name: string

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    description: string

    @IsUrl()
    @IsOptional()
    @ApiProperty({ required: false })
    imagePath: string

    @IsPositive()
    @IsOptional()
    @ApiProperty({ required: false })
    idApi: number
}
