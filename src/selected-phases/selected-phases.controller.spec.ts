import { Test, TestingModule } from '@nestjs/testing';
import { SelectedPhasesController } from './selected-phases.controller';
import { SelectedPhasesService } from './selected-phases.service';

describe('SelectedPhasesController', () => {
  let controller: SelectedPhasesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelectedPhasesController],
      providers: [SelectedPhasesService],
    }).compile();

    controller = module.get<SelectedPhasesController>(SelectedPhasesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
