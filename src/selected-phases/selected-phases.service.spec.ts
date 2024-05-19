import { Test, TestingModule } from '@nestjs/testing';
import { SelectedPhasesService } from './selected-phases.service';

describe('SelectedPhasesService', () => {
  let service: SelectedPhasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelectedPhasesService],
    }).compile();

    service = module.get<SelectedPhasesService>(SelectedPhasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
