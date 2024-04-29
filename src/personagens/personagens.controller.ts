import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { PersonagensService } from './personagens.service';
import { PersonagemDTO } from './dto/personagem.dto';
import { IsObjectIdPipe } from 'nestjs-object-id/dist/pipes/is-object-id.pipe';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('personagens')
@Controller('personagens')
export class PersonagensController {
  constructor(private readonly personagensService: PersonagensService) { }

  @Post()
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiOperation({summary: 'Cria um personagem',})
  create(@Body(new ValidationPipe()) PersonagemDTO: PersonagemDTO) {
    return this.personagensService.create(PersonagemDTO);
  }

  @Get()
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiOperation({summary: 'Lista todos os personagens',})
  findAll() {
    return this.personagensService.findAll();
  }

  @Get(':id')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiOperation({summary: 'Lista um personagem a partir do id',})
  findOne(@Param('id', IsObjectIdPipe) id: string) {
    return this.personagensService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiOperation({summary: 'Atualiza um personagem a partir do id',})
  update(@Param('id', IsObjectIdPipe) id: string, @Body(new ValidationPipe()) PersonagemDTO: PersonagemDTO) {
    return this.personagensService.update(id, PersonagemDTO);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiOperation({summary: 'Remove um personagem a partir do id',})
  remove(@Param('id', IsObjectIdPipe) id: string) {
    return this.personagensService.remove(id);
  }
}
