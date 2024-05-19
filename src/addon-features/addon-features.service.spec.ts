import { Test, TestingModule } from '@nestjs/testing';
import { AddonFeaturesService } from './addon-features.service';

describe('AddonFeaturesService', () => {
  let service: AddonFeaturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddonFeaturesService],
    }).compile();

    service = module.get<AddonFeaturesService>(AddonFeaturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
