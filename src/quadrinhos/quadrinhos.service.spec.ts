import { Test, TestingModule } from '@nestjs/testing';
import { ComicsService } from './quadrinhos.service';

describe('ComicsService', () => {
  let service: ComicsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComicsService],
    }).compile();

    service = module.get<ComicsService>(ComicsService);
  });

  it('Precisa ser definido!', () => {
    expect(service).toBeDefined();
  });
});
