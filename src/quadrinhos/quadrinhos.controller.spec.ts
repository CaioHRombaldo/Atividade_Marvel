import { Test, TestingModule } from '@nestjs/testing';
import { ComicsController } from './quadrinhos.controller';
import { ComicsService } from './quadrinhos.service';

describe('ComicsController', () => {
  let controller: ComicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComicsController],
      providers: [ComicsService],
    }).compile();

    controller = module.get<ComicsController>(ComicsController);
  });

  it('Precisa ser definido!', () => {
    expect(controller).toBeDefined();
  });
});
