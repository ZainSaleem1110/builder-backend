import { Test, TestingModule } from '@nestjs/testing';
import { TemplateSelectedFeaturesService } from './template-selected-features.service';

describe('TemplateSelectedFeaturesService', () => {
  let service: TemplateSelectedFeaturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateSelectedFeaturesService],
    }).compile();

    service = module.get<TemplateSelectedFeaturesService>(TemplateSelectedFeaturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
