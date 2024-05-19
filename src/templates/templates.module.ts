import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TemplatesService } from "./templates.service";
import { TemplatesController } from "./templates.controller";
import { Template } from "./entities/template.entity";
import { TemplateFeaturesModule } from "../template-features/template-features.module";
import { TemplateImagesModule } from "../template-images/template-images.module";
import { AuthModule } from "src/auth/auth.module";
import { VerticalsModule } from "src/verticals/verticals.module";
import { PhasesModule } from "src/phases/phases.module";
import { PlatformsModule } from "src/platforms/platforms.module";
import { AddonFeaturesModule } from "src/addon-features/addon-features.module";
import { AddonsModule } from "src/addons/addons.module";
import { FeaturesModule } from "../features/features.module";

@Module({
  imports: [
    AuthModule,
    TemplateFeaturesModule,
    TemplateImagesModule,
    VerticalsModule,
    PhasesModule,
    PlatformsModule,
    AddonsModule,
    FeaturesModule,
    TypeOrmModule.forFeature([Template]),
  ],
  controllers: [TemplatesController],
  providers: [TemplatesService],
  exports: [TemplatesService],
})
export class TemplatesModule {}
