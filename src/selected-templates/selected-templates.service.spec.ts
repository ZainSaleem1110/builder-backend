import { Test, TestingModule } from '@nestjs/testing';
import { SelectedTemplatesService } from './selected-templates.service';

describe('SelectedTemplatesService', () => {
  let service: SelectedTemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelectedTemplatesService],
    }).compile();

    service = module.get<SelectedTemplatesService>(SelectedTemplatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
