import { Module } from "@nestjs/common";
// import { StripeModule } from 'nestjs-stripe';
import { StripePaymentService } from "./stripe-payment.service";
import { StripePaymentController } from "./stripe-payment.controller";
import { AuthModule } from "src/auth/auth.module";

// imports: [
//   StripeModule.forRoot({
//     apiKey:
//       'sk_test_51LMJsNCoMf0sHzSauV7XEDcwKXOfZsekdJwXBfkvpsDOm1ajyhX5LWmPjeIRfIuByNe8vKxW15ymeEnddVOWVBSx00oOJ8Sl9A',
//     apiVersion: '2020-08-27',
//   }),
// ],

@Module({
  imports: [AuthModule],
  controllers: [StripePaymentController],
  providers: [StripePaymentService],
})
export class StripePaymentModule {}
