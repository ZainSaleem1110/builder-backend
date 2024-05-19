import { Test, TestingModule } from '@nestjs/testing';
import { OrderRequirementsService } from './order-requirements.service';

describe('OrderRequirementsService', () => {
  let service: OrderRequirementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderRequirementsService],
    }).compile();

    service = module.get<OrderRequirementsService>(OrderRequirementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
