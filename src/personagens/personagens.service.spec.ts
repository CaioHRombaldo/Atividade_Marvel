import { Test, TestingModule } from '@nestjs/testing';
import { PersonagensService } from './personagens.service';

describe('PersonagensService', () => {
  let service: PersonagensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonagensService],
    }).compile();

    service = module.get<PersonagensService>(PersonagensService);
  });

  it('Precisa ser definido!', () => {
    expect(service).toBeDefined();
  });
});
