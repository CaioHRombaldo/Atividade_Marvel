import { Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { IsObjectIdPipe } from 'nestjs-object-id';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post(":id")
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiParam({ name: 'id', description: 'O id do Usuário', format: 'uuid' })
  createToken(@Param('id', IsObjectIdPipe) userID: string) {
    return this.authService.create(userID);
  }
}
