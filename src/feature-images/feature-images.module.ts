import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FeatureImagesService } from "./feature-images.service";
import { FeatureImagesController } from "./feature-images.controller";
import { FeatureImage } from "./entities/feature-image.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([FeatureImage])],
  controllers: [FeatureImagesController],
  providers: [FeatureImagesService],
  exports: [FeatureImagesService],
})
export class FeatureImagesModule {}
