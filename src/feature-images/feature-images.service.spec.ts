import { Test, TestingModule } from '@nestjs/testing';
import { FeatureImagesService } from './feature-images.service';

describe('FeatureImagesService', () => {
  let service: FeatureImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeatureImagesService],
    }).compile();

    service = module.get<FeatureImagesService>(FeatureImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
