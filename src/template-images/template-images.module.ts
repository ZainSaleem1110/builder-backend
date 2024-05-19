import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TemplateImagesService } from "./template-images.service";
import { TemplateImagesController } from "./template-images.controller";
import { TemplateImage } from "./entities/template-image.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([TemplateImage])],
  controllers: [TemplateImagesController],
  providers: [TemplateImagesService],
  exports: [TemplateImagesService],
})
export class TemplateImagesModule {}
