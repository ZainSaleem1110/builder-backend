import { Test, TestingModule } from '@nestjs/testing';
import { TemplateFeaturesController } from './template-features.controller';
import { TemplateFeaturesService } from './template-features.service';

describe('TemplateFeaturesController', () => {
  let controller: TemplateFeaturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplateFeaturesController],
      providers: [TemplateFeaturesService],
    }).compile();

    controller = module.get<TemplateFeaturesController>(TemplateFeaturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
