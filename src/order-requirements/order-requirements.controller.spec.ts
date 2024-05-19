import { Test, TestingModule } from '@nestjs/testing';
import { OrderRequirementsController } from './order-requirements.controller';
import { OrderRequirementsService } from './order-requirements.service';

describe('OrderRequirementsController', () => {
  let controller: OrderRequirementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderRequirementsController],
      providers: [OrderRequirementsService],
    }).compile();

    controller = module.get<OrderRequirementsController>(OrderRequirementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
