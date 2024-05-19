import { Test, TestingModule } from '@nestjs/testing';
import { SelectedPlatformsController } from './selected-platforms.controller';
import { SelectedPlatformsService } from './selected-platforms.service';

describe('SelectedPlatformsController', () => {
  let controller: SelectedPlatformsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelectedPlatformsController],
      providers: [SelectedPlatformsService],
    }).compile();

    controller = module.get<SelectedPlatformsController>(SelectedPlatformsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
