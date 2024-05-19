import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InstallmentsService } from "./installments.service";
import { InstallmentsController } from "./installments.controller";
import { Installment } from "./entities/installment.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Installment])],
  controllers: [InstallmentsController],
  providers: [InstallmentsService],
})
export class InstallmentsModule {}
