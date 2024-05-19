import { Test, TestingModule } from '@nestjs/testing';
import { TemplateSelectedFeaturesController } from './template-selected-features.controller';
import { TemplateSelectedFeaturesService } from './template-selected-features.service';

describe('TemplateSelectedFeaturesController', () => {
  let controller: TemplateSelectedFeaturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplateSelectedFeaturesController],
      providers: [TemplateSelectedFeaturesService],
    }).compile();

    controller = module.get<TemplateSelectedFeaturesController>(TemplateSelectedFeaturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
