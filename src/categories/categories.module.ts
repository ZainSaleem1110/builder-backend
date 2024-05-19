import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriesService } from "./categories.service";
import { CategoriesController } from "./categories.controller";
import { Category } from "./entities/category.entity";
import { CategoryFeaturesModule } from "../category-features/category-features.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [
    AuthModule,
    CategoryFeaturesModule,
    TypeOrmModule.forFeature([Category]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
