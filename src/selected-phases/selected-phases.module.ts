import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SelectedPhasesService } from "./selected-phases.service";
import { SelectedPhasesController } from "./selected-phases.controller";
import { SelectedPhase } from "./entities/selected-phase.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([SelectedPhase])],
  controllers: [SelectedPhasesController],
  providers: [SelectedPhasesService],
})
export class SelectedPhasesModule {}
