import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { ComicsService } from './quadrinhos.service';
import { ComicDto } from './dto/quadrinho.dto';
import { IsObjectIdPipe } from 'nestjs-object-id/dist/pipes/is-object-id.pipe';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('quadrinhos')
@Controller('quadrinhos')
export class ComicsController {
  constructor(private readonly quadrinhosService: ComicsService) { }

  @Post()
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiOperation({summary: 'Cria um quadrinho',})
  create(@Body(new ValidationPipe()) ComicDto: ComicDto) {
    return this.quadrinhosService.create(ComicDto);
  }

  @Get()
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiOperation({summary: 'Lista todos os quadrinhos',})
  findAll() {
    return this.quadrinhosService.findAll();
  }

  @Get(':id')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiOperation({summary: 'Lista um quadrinho a partir do id',})
  findOne(@Param('id', IsObjectIdPipe) id: string) {
    return this.quadrinhosService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiOperation({summary: 'Atualiza um quadrinho a partir do id',})
  update(@Param('id', IsObjectIdPipe) id: string, @Body(new ValidationPipe()) ComicDto: ComicDto) {
    return this.quadrinhosService.update(id, ComicDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiOperation({summary: 'Remove um quadrinho a partir do id',})
  remove(@Param('id', IsObjectIdPipe) id: string) {
    return this.quadrinhosService.remove(id);
  }
}
