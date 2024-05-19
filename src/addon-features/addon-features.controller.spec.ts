import { Test, TestingModule } from '@nestjs/testing';
import { AddonFeaturesController } from './addon-features.controller';
import { AddonFeaturesService } from './addon-features.service';

describe('AddonFeaturesController', () => {
  let controller: AddonFeaturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddonFeaturesController],
      providers: [AddonFeaturesService],
    }).compile();

    controller = module.get<AddonFeaturesController>(AddonFeaturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
