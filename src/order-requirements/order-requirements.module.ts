import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderRequirementsService } from "./order-requirements.service";
import { OrderRequirementsController } from "./order-requirements.controller";
import { OrderRequirement } from "./entities/order-requirement.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([OrderRequirement])],
  controllers: [OrderRequirementsController],
  providers: [OrderRequirementsService],
})
export class OrderRequirementsModule {}
