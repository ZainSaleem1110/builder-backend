import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { MailerModule } from "@nestjs-modules/mailer";
import { join } from "path";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { getEnvPath } from "./common/helper/env.helper";
import { TypeOrmConfigService } from "./shared/typeorm/typeorm.service";
import { CategoriesModule } from "./categories/categories.module";
import { FeaturesModule } from "./features/features.module";
import { TemplatesModule } from "./templates/templates.module";
import { PhasesModule } from "./phases/phases.module";
import { PlatformsModule } from "./platforms/platforms.module";
import { AddonsModule } from "./addons/addons.module";
import { AddonFeaturesModule } from "./addon-features/addon-features.module";
import { TemplateSelectedFeaturesModule } from "./template-selected-features/template-selected-features.module";
import { OrdersModule } from "./orders/orders.module";
import { OrderRequirementsModule } from "./order-requirements/order-requirements.module";
import { SelectedTemplatesModule } from "./selected-templates/selected-templates.module";
import { SelectedFeaturesModule } from "./selected-features/selected-features.module";
import { SelectedPhasesModule } from "./selected-phases/selected-phases.module";
import { SelectedAddonsModule } from "./selected-addons/selected-addons.module";
import { SelectedPlatformsModule } from "./selected-platforms/selected-platforms.module";
import { BillingsModule } from "./billings/billings.module";
import { PaymentMethodsModule } from "./payment-methods/payment-methods.module";
import { InstallmentsModule } from "./installments/installments.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { TemplateFeaturesModule } from "./template-features/template-features.module";
import { CategoryFeaturesModule } from "./category-features/category-features.module";
import { StripePaymentModule } from "./stripe-payment/stripe-payment.module";
import { VerticalsModule } from "./verticals/verticals.module";
import { TemplateImagesModule } from "./template-images/template-images.module";
import { ImageUploadModule } from "./image-upload/image-upload.module";
import { FeatureImagesModule } from "./feature-images/feature-images.module";
import { StripeModule } from "./stripe/stripe.module";
import { MailServiceModule } from "./mail-service/mail-service.module";
import { CodeVerificationModule } from "./code-verification/code-verification.module";
const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    MailerModule.forRoot({
      transport: "smtps://user@domain.com:pass@smtp.domain.com",
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + "/templates",
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    ScheduleModule.forRoot(),
    CategoriesModule,
    FeaturesModule,
    TemplatesModule,
    PhasesModule,
    PlatformsModule,
    AddonsModule,
    AddonFeaturesModule,
    TemplateSelectedFeaturesModule,
    OrdersModule,
    OrderRequirementsModule,
    SelectedTemplatesModule,
    SelectedFeaturesModule,
    SelectedPhasesModule,
    SelectedAddonsModule,
    SelectedPlatformsModule,
    BillingsModule,
    PaymentMethodsModule,
    InstallmentsModule,
    AuthModule,
    UsersModule,
    TemplateFeaturesModule,
    CategoryFeaturesModule,
    StripePaymentModule,
    VerticalsModule,
    TemplateImagesModule,
    ImageUploadModule,
    FeatureImagesModule,
    StripeModule,
    MailServiceModule,
    CodeVerificationModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
