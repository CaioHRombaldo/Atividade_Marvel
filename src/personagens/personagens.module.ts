import { Module } from '@nestjs/common';
import { PersonagensService } from './personagens.service';
import { PersonagensController } from './personagens.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Character, CharacterSchema } from './schemas/personagem.schema';
import { MarvelAPIModule } from 'src/marvelAPI/marvel.module';

@Module({
  imports: [
    MarvelAPIModule,
    MongooseModule.forFeature([{ name: Character.name, schema: CharacterSchema }])
  ],
  controllers: [PersonagensController],
  providers: [PersonagensService],
})
export class PersonagensModule { }
