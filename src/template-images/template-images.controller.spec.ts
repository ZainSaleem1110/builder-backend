import { Test, TestingModule } from '@nestjs/testing';
import { TemplateImagesController } from './template-images.controller';
import { TemplateImagesService } from './template-images.service';

describe('TemplateImagesController', () => {
  let controller: TemplateImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplateImagesController],
      providers: [TemplateImagesService],
    }).compile();

    controller = module.get<TemplateImagesController>(TemplateImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
