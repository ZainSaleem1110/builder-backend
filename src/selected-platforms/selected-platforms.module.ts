import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SelectedPlatformsService } from "./selected-platforms.service";
import { SelectedPlatformsController } from "./selected-platforms.controller";
import { SelectedPlatform } from "./entities/selected-platform.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([SelectedPlatform])],
  controllers: [SelectedPlatformsController],
  providers: [SelectedPlatformsService],
})
export class SelectedPlatformsModule {}
