import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator"
import { IsString } from "class-validator"

export class updateUserDto {
    @IsString()
    @ApiProperty()
    name: string
}
