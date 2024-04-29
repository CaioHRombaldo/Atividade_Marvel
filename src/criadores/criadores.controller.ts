import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { CriadorsService } from './criadores.service';
import { CriadorDto } from './dto/criador.dto';
import { IsObjectIdPipe } from 'nestjs-object-id/dist/pipes/is-object-id.pipe';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('criadores')
@Controller('criadores')
export class CriadorsController {
  constructor(private readonly criadoresService: CriadorsService) { }

  @Post()
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiOperation({summary: 'Cria um criador',})
  create(@Body(new ValidationPipe()) CriadorDto: CriadorDto) {
    return this.criadoresService.create(CriadorDto);
  }

  @Get()
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiOperation({summary: 'Lista todos os criadores',})
  findAll() {
    return this.criadoresService.findAll();
  }

  @Get(':id')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiOperation({summary: 'Lista um criador a partir do id',})
  findOne(@Param('id', IsObjectIdPipe) id: string) {
    return this.criadoresService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiOperation({summary: 'Atualiza um criador a partir do id',})
  update(@Param('id', IsObjectIdPipe) id: string, @Body(new ValidationPipe()) CriadorDto: CriadorDto) {
    return this.criadoresService.update(id, CriadorDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiOperation({summary: 'Remove um criador a partir do id',})
  remove(@Param('id', IsObjectIdPipe) id: string) {
    return this.criadoresService.remove(id);
  }
}
