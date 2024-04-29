import { Module } from '@nestjs/common';
import { ComicsService } from './quadrinhos.service';
import { ComicsController } from './quadrinhos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comic, ComicSchema } from './schemas/quadrinhos.schema';
import { MarvelAPIModule } from 'src/marvelAPI/marvel.module';

@Module({
  imports: [
    MarvelAPIModule,
    MongooseModule.forFeature([{ name: Comic.name, schema: ComicSchema }])
  ],
  controllers: [ComicsController],
  providers: [ComicsService],
})
export class ComicsModule { }
