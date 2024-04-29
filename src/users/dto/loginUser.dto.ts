import { ApiTags } from "@nestjs/swagger"
import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator"
import { IsEmail, IsString } from "class-validator"

export class loginUserDto {
    @IsEmail()
    @ApiProperty()
    email: string

    @IsString()
    @ApiProperty()
    password: string
}