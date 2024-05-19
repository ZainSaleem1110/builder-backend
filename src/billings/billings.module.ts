import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BillingsService } from "./billings.service";
import { BillingsController } from "./billings.controller";
import { Billing } from "./entities/billing.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Billing])],
  controllers: [BillingsController],
  providers: [BillingsService],
})
export class BillingsModule {}
