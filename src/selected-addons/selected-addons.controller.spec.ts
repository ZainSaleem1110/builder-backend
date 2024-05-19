import { Test, TestingModule } from '@nestjs/testing';
import { SelectedAddonsController } from './selected-addons.controller';
import { SelectedAddonsService } from './selected-addons.service';

describe('SelectedAddonsController', () => {
  let controller: SelectedAddonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelectedAddonsController],
      providers: [SelectedAddonsService],
    }).compile();

    controller = module.get<SelectedAddonsController>(SelectedAddonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
