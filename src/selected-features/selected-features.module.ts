import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SelectedFeaturesService } from "./selected-features.service";
import { SelectedFeaturesController } from "./selected-features.controller";
import { SelectedFeature } from "./entities/selected-feature.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([SelectedFeature])],
  controllers: [SelectedFeaturesController],
  providers: [SelectedFeaturesService],
})
export class SelectedFeaturesModule {}
