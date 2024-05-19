import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { StripePaymentService } from "./stripe-payment.service";
import { CreateStripePaymentDto } from "./dto/create-stripe-payment.dto";
import { UpdateStripePaymentDto } from "./dto/update-stripe-payment.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("stripe-payment")
@UseGuards(AuthGuard)
export class StripePaymentController {
  constructor(private readonly stripePaymentService: StripePaymentService) {}

  @Post()
  create(@Body() createStripePaymentDto: CreateStripePaymentDto) {
    return this.stripePaymentService.create(createStripePaymentDto);
  }

  @Get()
  findAll() {
    return this.stripePaymentService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.stripePaymentService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateStripePaymentDto: UpdateStripePaymentDto
  ) {
    return this.stripePaymentService.update(+id, updateStripePaymentDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.stripePaymentService.remove(+id);
  }
}
