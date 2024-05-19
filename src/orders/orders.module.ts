import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { Order } from "./entities/order.entity";
import { OrderMails } from "./entities/order-mails.entity";
import { AuthModule } from "src/auth/auth.module";
import { UsersModule } from "src/users/users.module";
import { StripeModule } from "src/stripe/stripe.module";
import { MailServiceModule } from "../mail-service/mail-service.module";
import { FeaturesModule } from "../features/features.module";
import { AddonsModule } from "../addons/addons.module";
import { PhasesModule } from "../phases/phases.module";
import { TemplatesModule } from "../templates/templates.module";
import { PlatformsModule } from "src/platforms/platforms.module";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    StripeModule,
    MailServiceModule,
    FeaturesModule,
    AddonsModule,
    PhasesModule,
    PlatformsModule,
    TemplatesModule,
    TypeOrmModule.forFeature([Order, OrderMails]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
