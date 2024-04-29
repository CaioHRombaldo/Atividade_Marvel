import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator"
import { IsEmail, IsString } from "class-validator"

export class createUserDto {
    @IsString()
    @ApiProperty()
    name: string

    @IsEmail()
    @ApiProperty()
    email: string

    @IsString()
    @ApiProperty()
    password: string
}
