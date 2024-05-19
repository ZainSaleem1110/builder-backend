import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FeaturesService } from "./features.service";
import { FeaturesController } from "./features.controller";
import { Feature } from "./entities/feature.entity";
import { FeatureImagesModule } from "../feature-images/feature-images.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [
    AuthModule,
    FeatureImagesModule,
    TypeOrmModule.forFeature([Feature]),
  ],
  controllers: [FeaturesController],
  providers: [FeaturesService],
  exports: [FeaturesService],
})
export class FeaturesModule {}
