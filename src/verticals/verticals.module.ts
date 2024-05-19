import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerticalsService } from './verticals.service';
import { VerticalsController } from './verticals.controller';
import { Vertical } from '../verticals/entities/vertical.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vertical])],
  controllers: [VerticalsController],
  providers: [VerticalsService],
  exports:[VerticalsService]
})
export class VerticalsModule {}
