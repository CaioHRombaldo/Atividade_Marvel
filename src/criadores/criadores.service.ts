import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { CriadorDto } from './dto/criador.dto';
import { MarvelAPIService } from 'src/marvelAPI/marvel.service';
import { MarvelRequest } from 'src/marvelAPI/interfaces/marvelRequest.interface';
import { serieCriador } from './interfaces/serieCriador.inteface';
import { detailCriador } from './interfaces/detailCriador.interface';
import { comicCriador } from './interfaces/comicCriador.inteface';
import { Criador } from './schemas/criador.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';

@Injectable()
export class CriadorsService {
  constructor(
    private readonly marvelAPI: MarvelAPIService,
    @InjectModel(Criador.name) private criadorModel: Model<Criador>
  ) { }

  create(CriadorDto: CriadorDto): Promise<Criador> {
    return new this.criadorModel(CriadorDto).save()
  }

  async findAll(): Promise<Criador[]> {

    let criadores = await this.criadorModel.find()

    if (criadores.length > 0) {
      return criadores
    }

    const APIcriadores = await this.getCriadorsAPI()
    new this.criadorModel(APIcriadores).save()
    return [APIcriadores]
  }

  private async getCriadorsAPI(): Promise<Criador> {
    return this.marvelAPI.getPlanetHulk().then(serieData => this.builCriador(serieData.creators))
  }

  private async builCriador(creator: serieCriador): Promise<Criador> {
    const detail = await this.marvelAPI.get<MarvelRequest<detailCriador>>(
      creator.collectionURI
    ).then(item => item.data.results.at(0))

    let comics: Promise<comicCriador[]>[] = []
    for (let count = 0; count < detail.comics.available; count = count + 100) {
      console.log(detail.comics.collectionURI)
      const comic = this.marvelAPI.get<MarvelRequest<comicCriador>>(
        detail.comics.collectionURI,
        new URLSearchParams({ limit: "100", offset: count.toString() })
      ).then(item => item.data.results)

      comics = comics.concat(comic)
    }

    return {
      fullName: detail.fullName,
      role: creator.items.at(0).role,
      idApi: detail.id,
      imagePath: `${detail.thumbnail.path}.${detail.thumbnail.extension}`,
      comics: (await Promise.all(comics)).flat(1).map(item => item.title)
    }
  }

  async findOne(id: string): Promise<Criador> {
    return this.criadorModel.findById(id)
  }

  update(id: string, CriadorDto: CriadorDto): Promise<Criador> {
    return this.criadorModel.findByIdAndUpdate(id, CriadorDto)

  }

  remove(id: string): Promise<Criador> {
    return this.criadorModel.findByIdAndDelete(id)
  }
}