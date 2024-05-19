import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
} from "@nestjs/common";
import { CreateStripeDto } from "./dto/create-stripe.dto";
import { UpdateStripeDto } from "./dto/update-stripe.dto";
import Stripe from "stripe";

@Injectable()
export class StripeService {
  private stripe: any;
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2020-08-27",
    });
  }

  async create(createStripeDto: CreateStripeDto) {
    try {
      const cents = createStripeDto.price * 100;
      //  attch payment id to customer
      await this.stripe.paymentMethods.attach(
        createStripeDto.methodId ,
        {
          customer: createStripeDto.customer,
        }
      )
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: `${cents}`,
        currency: "usd", //set currency
        payment_method_types: ["card"],
        customer: createStripeDto.customer,
        payment_method: createStripeDto.methodId,
      });
      if (!paymentIntent) {
        throw new BadRequestException("Transaction failed");
      }
      const PaymentDone = await this.stripe.paymentIntents.confirm(
        paymentIntent.id,
        { payment_method: createStripeDto.methodId }
      );
      if (!PaymentDone) {
        throw new ForbiddenException("Transaction failed");
      }
      return { message: "transaction complete" };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async createCustomer(payment_id : string) {
    let customer :any= ''
    try {
      customer = await this.stripe.customers.create();
      if (!customer.id) {
        throw new BadRequestException("Customer creation failed");
      }
      return customer;
    } catch (error) {
      throw new HttpException({"error ":error.message, custome_error: {customer , payment_id }}, error.status);
    }
  }

  findAll() {
    return `This action returns all stripe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stripe`;
  }

  update(id: number, updateStripeDto: UpdateStripeDto) {
    return `This action updates a #${id} stripe`;
  }

  remove(id: number) {
    return `This action removes a #${id} stripe`;
  }
}
