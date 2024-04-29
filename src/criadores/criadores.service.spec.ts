import { Test, TestingModule } from '@nestjs/testing';
import { CriadorsService } from './criadores.service';

describe('CriadorsService', () => {
  let service: CriadorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CriadorsService],
    }).compile();

    service = module.get<CriadorsService>(CriadorsService);
  });

  it('Precisa ser definido!', () => {
    expect(service).toBeDefined();
  });
});
