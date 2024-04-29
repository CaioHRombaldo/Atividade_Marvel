import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, IsPositive, IsDateString } from 'class-validator';
export class ComicDto {
    @IsString()
    @ApiProperty()
    format: string

    @IsPositive()
    @ApiProperty()
    pageCount: number

    @IsString()
    @ApiProperty()
    title: string

    @IsDateString()
    @ApiProperty()
    dateOnStart: Date

    @IsUrl()
    @IsOptional()
    @ApiProperty({ required: false })
    imagePath: string

    @IsPositive()
    @IsOptional()
    @ApiProperty({ required: false })
    idApi: number
}
