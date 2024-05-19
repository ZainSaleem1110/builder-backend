import { Test, TestingModule } from '@nestjs/testing';
import { CategoryFeaturesController } from './category-features.controller';
import { CategoryFeaturesService } from './category-features.service';

describe('CategoryFeaturesController', () => {
  let controller: CategoryFeaturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryFeaturesController],
      providers: [CategoryFeaturesService],
    }).compile();

    controller = module.get<CategoryFeaturesController>(CategoryFeaturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
