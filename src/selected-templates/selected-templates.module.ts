import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SelectedTemplatesService } from "./selected-templates.service";
import { SelectedTemplatesController } from "./selected-templates.controller";
import { SelectedTemplate } from "./entities/selected-template.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([SelectedTemplate])],
  controllers: [SelectedTemplatesController],
  providers: [SelectedTemplatesService],
})
export class SelectedTemplatesModule {}
