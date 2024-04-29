import { Test, TestingModule } from '@nestjs/testing';
import { CriadorsController } from './criadores.controller';
import { CriadorsService } from './criadores.service';

describe('CriadorsController', () => {
  let controller: CriadorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CriadorsController],
      providers: [CriadorsService],
    }).compile();

    controller = module.get<CriadorsController>(CriadorsController);
  });

  it('Precisa ser definido!', () => {
    expect(controller).toBeDefined();
  });
});
