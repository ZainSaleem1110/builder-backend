import { Test, TestingModule } from '@nestjs/testing';
import { SelectedPlatformsService } from './selected-platforms.service';

describe('SelectedPlatformsService', () => {
  let service: SelectedPlatformsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelectedPlatformsService],
    }).compile();

    service = module.get<SelectedPlatformsService>(SelectedPlatformsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
