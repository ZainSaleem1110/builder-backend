import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SelectedAddonsService } from "./selected-addons.service";
import { SelectedAddonsController } from "./selected-addons.controller";
import { SelectedAddon } from "./entities/selected-addon.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([SelectedAddon])],
  controllers: [SelectedAddonsController],
  providers: [SelectedAddonsService],
})
export class SelectedAddonsModule {}
