import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PhasesService } from "./phases.service";
import { PhasesController } from "./phases.controller";
import { Phase } from "./entities/phase.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Phase])],
  controllers: [PhasesController],
  providers: [PhasesService],
  exports:[PhasesService]
})
export class PhasesModule {}
