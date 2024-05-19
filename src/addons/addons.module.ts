import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddonsService } from './addons.service';
import { AddonsController } from './addons.controller';
import { Addon } from './entities/addon.entity';
import { AddonFeaturesModule } from '../addon-features/addon-features.module';

@Module({
  imports: [AddonFeaturesModule, TypeOrmModule.forFeature([Addon])],
  controllers: [AddonsController],
  providers: [AddonsService],
  exports:[AddonsService]
})
export class AddonsModule {}
