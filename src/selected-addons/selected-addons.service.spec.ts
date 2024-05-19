import { Test, TestingModule } from '@nestjs/testing';
import { SelectedAddonsService } from './selected-addons.service';

describe('SelectedAddonsService', () => {
  let service: SelectedAddonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelectedAddonsService],
    }).compile();

    service = module.get<SelectedAddonsService>(SelectedAddonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
