import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TemplateFeaturesService } from "./template-features.service";
import { TemplateFeaturesController } from "./template-features.controller";
import { TemplateFeature } from "./entities/template-feature.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([TemplateFeature])],
  controllers: [TemplateFeaturesController],
  providers: [TemplateFeaturesService],
  exports: [TemplateFeaturesService],
})
export class TemplateFeaturesModule {}
