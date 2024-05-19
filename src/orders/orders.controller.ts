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
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { PaymentMailOrder } from "./dto/payment-mail-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { CompleteOrder } from "./dto/complete-order.dto";

@Controller("orders")
// @UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Post("/send-code")
  sendPaymentMail(@Body() body: PaymentMailOrder) {
    return this.ordersService.sendPaymentMail(body);
  }

  @Post("/resend-code")
  resendPaymentMail(@Body() body: PaymentMailOrder) {
    return this.ordersService.resendPaymentMail(body);
  }

  @Post("/complete")
  complete(@Body() body: CompleteOrder) {
    return this.ordersService.complete(body);
  }
  @Get('/user/:id')
  OrdersByUserId(@Param("id") id: number){
    return this.ordersService.OrdersByUserId(id)
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  // @Get("/cron")
  // test() {
  //   return this.ordersService.handleCronInstalmentPayments();
  // }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(":id")
  ArchivedOrder(@Param("id") id: string) {
    return this.ordersService.ArchivedOrder(+id);
  }
}
