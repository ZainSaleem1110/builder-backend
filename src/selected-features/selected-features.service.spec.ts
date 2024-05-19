import { Test, TestingModule } from '@nestjs/testing';
import { SelectedFeaturesService } from './selected-features.service';

describe('SelectedFeaturesService', () => {
  let service: SelectedFeaturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelectedFeaturesService],
    }).compile();

    service = module.get<SelectedFeaturesService>(SelectedFeaturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
