import { Test, TestingModule } from '@nestjs/testing';
import { TemplateFeaturesService } from './template-features.service';

describe('TemplateFeaturesService', () => {
  let service: TemplateFeaturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateFeaturesService],
    }).compile();

    service = module.get<TemplateFeaturesService>(TemplateFeaturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
