import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryFeaturesService } from "./category-features.service";
import { CategoryFeaturesController } from "./category-features.controller";
import { CategoryFeature } from "./entities/category-feature.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([CategoryFeature])],
  controllers: [CategoryFeaturesController],
  providers: [CategoryFeaturesService],
  exports: [CategoryFeaturesService],
})
export class CategoryFeaturesModule {}
