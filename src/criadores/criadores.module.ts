import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { CriadorsService } from './criadores.service';
import { CriadorsController } from './criadores.controller';
import { MarvelAPIModule } from 'src/marvelAPI/marvel.module';
import { Criador, CriadorSchema } from './schemas/criador.schema';

@Module({
  imports: [
    MarvelAPIModule,
    MongooseModule.forFeature([{ name: Criador.name, schema: CriadorSchema }])
  ],
  controllers: [CriadorsController],
  providers: [CriadorsService],
})
export class CriadorsModule { }
