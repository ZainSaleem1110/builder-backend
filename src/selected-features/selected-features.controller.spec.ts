import { Test, TestingModule } from '@nestjs/testing';
import { SelectedFeaturesController } from './selected-features.controller';
import { SelectedFeaturesService } from './selected-features.service';

describe('SelectedFeaturesController', () => {
  let controller: SelectedFeaturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelectedFeaturesController],
      providers: [SelectedFeaturesService],
    }).compile();

    controller = module.get<SelectedFeaturesController>(SelectedFeaturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
