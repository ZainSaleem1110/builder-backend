import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TemplateSelectedFeaturesService } from "./template-selected-features.service";
import { TemplateSelectedFeaturesController } from "./template-selected-features.controller";
import { TemplateSelectedFeature } from "./entities/template-selected-feature.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([TemplateSelectedFeature])],
  controllers: [TemplateSelectedFeaturesController],
  providers: [TemplateSelectedFeaturesService],
})
export class TemplateSelectedFeaturesModule {}
