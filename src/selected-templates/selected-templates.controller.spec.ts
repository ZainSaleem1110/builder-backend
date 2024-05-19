import { Test, TestingModule } from '@nestjs/testing';
import { SelectedTemplatesController } from './selected-templates.controller';
import { SelectedTemplatesService } from './selected-templates.service';

describe('SelectedTemplatesController', () => {
  let controller: SelectedTemplatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelectedTemplatesController],
      providers: [SelectedTemplatesService],
    }).compile();

    controller = module.get<SelectedTemplatesController>(SelectedTemplatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
