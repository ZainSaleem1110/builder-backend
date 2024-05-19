import { Module } from '@nestjs/common';
import { CodeVerificationService } from './code-verification.service';
import { CodeVerificationController } from './code-verification.controller';
import { CodeVerification } from './entities/code-verification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CodeVerification])],
  controllers: [CodeVerificationController],
  providers: [CodeVerificationService],
  exports: [CodeVerificationService],
})
export class CodeVerificationModule {}
