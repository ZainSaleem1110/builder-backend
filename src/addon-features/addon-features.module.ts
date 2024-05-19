import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddonFeaturesService } from './addon-features.service';
import { AddonFeaturesController } from './addon-features.controller';
import { AddonFeature } from './entities/addon-feature.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AddonFeature])],
  controllers: [AddonFeaturesController],
  providers: [AddonFeaturesService],
  exports: [AddonFeaturesService],
})
export class AddonFeaturesModule {}
