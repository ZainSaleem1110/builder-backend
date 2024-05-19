import { Test, TestingModule } from '@nestjs/testing';
import { CodeVerificationController } from './code-verification.controller';
import { CodeVerificationService } from './code-verification.service';

describe('CodeVerificationController', () => {
  let controller: CodeVerificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CodeVerificationController],
      providers: [CodeVerificationService],
    }).compile();

    controller = module.get<CodeVerificationController>(CodeVerificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
