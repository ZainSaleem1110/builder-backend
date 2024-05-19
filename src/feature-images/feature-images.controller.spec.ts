import { Test, TestingModule } from '@nestjs/testing';
import { FeatureImagesController } from './feature-images.controller';
import { FeatureImagesService } from './feature-images.service';

describe('FeatureImagesController', () => {
  let controller: FeatureImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeatureImagesController],
      providers: [FeatureImagesService],
    }).compile();

    controller = module.get<FeatureImagesController>(FeatureImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
