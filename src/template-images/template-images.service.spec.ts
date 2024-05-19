import { Test, TestingModule } from '@nestjs/testing';
import { TemplateImagesService } from './template-images.service';

describe('TemplateImagesService', () => {
  let service: TemplateImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateImagesService],
    }).compile();

    service = module.get<TemplateImagesService>(TemplateImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
