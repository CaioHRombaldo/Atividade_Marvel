import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUrl } from 'class-validator';

export class CriadorDto {
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    @ApiProperty()
    quadrinhos: string[]

    @IsString()
    @ApiProperty()
    role: string

    @IsString()
    @ApiProperty()
    fullName: string

    @IsUrl()
    @IsOptional()
    @ApiProperty({ required: false })
    imagePath: string

    @IsPositive()
    @IsOptional()
    @ApiProperty({ required: false })
    idApi: number
}
