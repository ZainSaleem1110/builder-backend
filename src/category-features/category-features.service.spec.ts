import { Test, TestingModule } from '@nestjs/testing';
import { CategoryFeaturesService } from './category-features.service';

describe('CategoryFeaturesService', () => {
  let service: CategoryFeaturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryFeaturesService],
    }).compile();

    service = module.get<CategoryFeaturesService>(CategoryFeaturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
