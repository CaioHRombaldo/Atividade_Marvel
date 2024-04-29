import { Injectable } from '@nestjs/common';
import { PersonagemDTO } from './dto/personagem.dto';
import { MarvelAPIService } from 'src/marvelAPI/marvel.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character } from './schemas/personagem.schema';
import { seriePersonagem } from './interfaces/seriePersonagem.interface';
import { detailCharacter } from './interfaces/detailPersonagem.interface';
import { MarvelRequest } from 'src/marvelAPI/interfaces/marvelRequest.interface';

@Injectable()
export class PersonagensService {
  constructor(
    private readonly marvelAPI: MarvelAPIService,
    @InjectModel(Character.name) private characterModel: Model<Character>
  ) { }

  create(PersonagemDTO: PersonagemDTO): Promise<Character> {
    return new this.characterModel(PersonagemDTO).save()
  }

  async findAll(): Promise<Character[]> {
    const character = await this.characterModel.find()

    if (character.length > 0) {
      return character
    }

    const personagens = await this.getPersonagensAPI()
    return await this.characterModel.insertMany(personagens)
  }

  private async getPersonagensAPI(): Promise<Character[]> {
    return this.marvelAPI.getPlanetHulk().then(serieData => this.builCharacter(serieData.personagens))
  }

  private async builCharacter(character: seriePersonagem): Promise<Character[]> {
    const detail = await this.marvelAPI.get<MarvelRequest<detailCharacter>>(
      character.collectionURI
    ).then(item => item.data.results)

    const personagens: Character[] = []

    for (let item of detail) {
      personagens.push({
        description: item.description,
        idApi: item.id,
        name: item.name,
        imagePath: `${item.thumbnail.path}.${item.thumbnail.extension}`
      })
    }
    return personagens
  }

  findOne(id: string): Promise<Character> {
    return this.characterModel.findById(id)
  }

  update(id: string, PersonagemDTO: PersonagemDTO): Promise<Character> {
    return this.characterModel.findByIdAndUpdate(id, PersonagemDTO)
  }

  remove(id: string): Promise<Character> {
    return this.characterModel.findByIdAndDelete(id)
  }
}
