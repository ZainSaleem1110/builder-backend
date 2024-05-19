import { HttpException, Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThan, Not, Repository } from "typeorm";
import { CreateOrderDto } from "./dto/create-order.dto";
import { PaymentMailOrder } from "./dto/payment-mail-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Order } from "./entities/order.entity";
import { OrderMails } from "./entities/order-mails.entity";
import { UsersService } from "../users/users.service";
import { CompleteOrder } from "./dto/complete-order.dto";
import { StripeService } from "src/stripe/stripe.service";
import { MailServiceService } from "../mail-service/mail-service.service";
import { FeaturesService } from "../features/features.service";
import { PhasesService } from "../phases/phases.service";
import { TemplatesService } from "../templates/templates.service";
import { AddonsService } from "../addons/addons.service";
import { sendOrderSuccessful } from "src/utils/functions";
import { PlatformsService } from "src/platforms/platforms.service";
import { Cron } from "@nestjs/schedule";

// test
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderMails)
    private orderMailsRepository: Repository<OrderMails>,
    private userService: UsersService,
    private stripeService: StripeService,
    private mailService: MailServiceService,
    private featureService: FeaturesService,
    private platformService: PlatformsService,
    private phasesService: PhasesService,
    private addonService: AddonsService,
    private templateService: TemplatesService,
    private mailServiceService: MailServiceService
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    let order;
    if (!createOrderDto.order_step)
      throw new NotAcceptableException("Order Step should be number, order_step");
    if (createOrderDto.order_step == 1 && !createOrderDto.order_id) {
      order = await this.orderRepository.insert({
        user_id: createOrderDto.user_id,
        status: createOrderDto.status,
        description: createOrderDto.description,
        payment_via: createOrderDto.payment_via || "card",
        payment_status: createOrderDto.payment_status,
        installment_duration_type: createOrderDto.installment_duration_type,
        total_installments: createOrderDto.total_installments,
        total_amount: createOrderDto.total_amount,
        total_duration: createOrderDto.total_duration,
        duration_type: createOrderDto.duration_type,
        order_step: createOrderDto.order_step,
        order_object: JSON.stringify(createOrderDto),
      });
      order = order.identifiers[0];
    } else if (createOrderDto.order_step > 1 || createOrderDto.order_id) {
      const orderObject = await this.orderRepository.findOne({
        where: {
          id: createOrderDto.order_id,
        },
      });

      const values = {
        order_object: JSON.stringify(createOrderDto),
        first_deposit: `${createOrderDto.first_deposit}` ?? `0`,
        total_amount: createOrderDto.total_amount,
      };
      if (createOrderDto.order_step)
        values['order_step'] = createOrderDto.order_step

      if (createOrderDto.total_installments)
        values['total_installments'] = createOrderDto.total_installments

      if (createOrderDto.order_step == 3) {
      } else if (createOrderDto.order_step == 4) {
      }
      console.log("vvv", {
        ...orderObject,
        ...values,
      })
      order = await this.orderRepository.save({
        ...orderObject,
        ...values,
      });
    }

    const orderObj = await this.orderRepository.findOne({
      where: {
        id: order.id,
      },
    });

    return orderObj;
  }

  async sendPaymentMail(body: PaymentMailOrder) {
    try {
      const user = await this.userService.findOne(body.user_id);

      let response;

      if (user) {
        const code = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);

        response = await this.orderMailsRepository.insert({
          user_id: body.user_id,
          order_id: body.order_id,
          code: code,
        });

        let obj = {
          to: user.email,
          subject: "Verification Code",
          template: "orderverificationcode",
          html: ``,
          mail_data: {
            user: user.name,
            code
          }
        }
        await this.mailServiceService.sendMailAsTemplate(obj);

      }

      return response;
    } catch (error) {
      return error;
    }
  }

  async resendPaymentMail(body: PaymentMailOrder) {
    try {
      const user = await this.userService.findOne(body.user_id);
      await this.orderMailsRepository.delete({ user_id: user.id, order_id: body.order_id });
      let response;

      if (user) {
        const code = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);

        response = await this.orderMailsRepository.insert({
          user_id: user.id,
          order_id: body.order_id,
          code: code,
        });

        let obj = {
          to: user.email,
          subject: "Verification Code",
          template: "orderverificationcode",
          html: ``,
          mail_data: {
            user: user.name,
            code
          }
        }
        await this.mailServiceService.sendMailAsTemplate(obj);

      }

      return response;
    } catch (error) {
      return error;
    }
  }

  async complete(body: CompleteOrder) {
    try {
      let response = {
        message: "Code verification failed",
        error: true,
      };

      const verifyCode = await this.orderMailsRepository.findOne({
        where: {
          code: body.code,
          order_id: body.order_id,
          user_id: body.user_id,
        },
      });

      if (verifyCode && body.paymentObject.paymentMethod.id) {
        const order = await this.orderRepository.findOne({
          where: { id: body.order_id },
        });
        await this.orderMailsRepository.delete(verifyCode.id);

        // get user card 
        const user = await this.userService.findOne(body.user_id);
        let cards = user.card_details ? JSON.parse(user.card_details) : []
        let card =  cards.find(e => e.active);
        let payment_id = card.cardObj.id;

        let customer:any = user.customer_id;
          // if user dont have customer_id then add it
          if(!user.customer_id){
            let u = await this.stripeService.createCustomer(payment_id)
            customer = u.id
          }
            
        const resp = await this.stripeService.create({
          price: parseFloat(order.first_deposit),  //parseFloat(order.total_amount)
          methodId: payment_id,
          customer : customer
        });

        if (resp) {
          let orderObj = await JSON.parse(order.order_object)
          orderObj.payment_id = body.paymentObject.paymentMethod.id // we are not using it now. we have cards array, there we can get that
          orderObj.installments[0].is_paid = true;
          let date = orderObj.installments[0].date
          let amount = orderObj.installments[0].amount
          const values = {
            status: "Pending",
            payment_status: "partial paid",
            order_object: JSON.stringify(orderObj)
          };
          await this.orderRepository.save({
            ...order,
            ...values,
          });

          // if user dont have customer_id then add it
          if(!user.customer_id)
            await this.userService.updateUserCustomerId({user_id : body.user_id, customer_id :customer} );

          let obj = {
            to: user.email,
            subject: "Congratulations",
            template: "ordersuccess",
            html: ``,
            mail_data: {
              user: user.name,
              date: date,
              amount: amount
            }
          }
          await this.mailServiceService.sendMailAsTemplate(obj);
          response = {
            message: "Order completed.",
            error: false,
          };
        }

      }

      return response;
    } catch (error) {
      return error;
    }
  }
  async findAll() {
    let orders = await this.orderRepository.find({
      where: { order_step: Not(LessThan(4)) },
      order: { createdAt: "DESC" },
    });
    for (let index = 0; index < orders.length; index++) {
      const element: any = orders[index];
      const userData = await this.userService.findOne(
        element.user_id
      );
      orders[index]['user'] = userData
    }
    return orders
  }

  @Cron('0 0 4 * * *') //run daily on 4 am for orders instalment payments 
  async handleCronInstalmentPayments() {
    let orders = await this.orderRepository.find({
      where: { order_step: Not(LessThan(4)), payment_status: "partial paid" },
      order: { createdAt: "DESC" },
    });
    let orders_have_to_pay = []
    for (let i = 0; i < orders.length; i++) {
      let ele: any = orders[i];
      ele.order_object = await JSON.parse(ele.order_object);
      if (ele.order_object?.installments?.length && ele.order_object.payment_id) {
        let instalmentsArr = ele.order_object?.installments || []

        // loop through instalments
        for (let i = 0; i < instalmentsArr.length; i++) {
          const e = instalmentsArr[i];
          if (this.isDatePassed(e.date) && !e.is_paid) {
            ele.current_instalment_key_index = e.key
            orders_have_to_pay.push(ele)
            break;
          }
        }
      }
    }
    await this.proceedToPayment(orders_have_to_pay)
  }

  async proceedToPayment(orders) {
    for (let i = 0; i < orders.length; i++) {
      let e = orders[i];
      let payment_id = e.payment_id;
      let instalment_obj = e.order_object.installments[e.current_instalment_key_index]
      let amount = instalment_obj.amount.replace(/[^0-9.]/g, "");

      // read user data 
      let user = await this.userService.findOne(e.user_id); 
      let cards = user.card_details ? JSON.parse(user.card_details) : []
      let card =  cards.find(e => e.active);
      if(card){
        //  use active card
        payment_id = card.cardObj.id;
      }
      // process stripe flow
      const resp = await this.stripeService.create({
        price: parseFloat(amount),
        methodId: payment_id,
        customer : user.customer_id
      });

      if (resp) {
        // update installment array 
        e.order_object.installments[e.current_instalment_key_index].is_paid = true
        let values = {
          order_object: JSON.stringify(e.order_object)
        };
        var last_index = e.order_object.installments.length - 1;
        if(e.current_instalment_key_index == last_index) // update payment status is all installment done
          {
            values['payment_status'] = "Completed"
          }
        const order = await this.orderRepository.findOne({
          where: { id: e.id },
        });
        await this.orderRepository.save({
          ...order,
          ...values,
        });
        this.sendInstalmentPaymentMail(order.user_id, instalment_obj)
      }
      else{
        console.log("failed Crone")
      }
    }
  }

  async sendInstalmentPaymentMail(user_id, instalment_obj) {
    let { amount, date } = instalment_obj
    const user = await this.userService.findOne(user_id);

    let obj = {
      to: user.email,
      subject: "Congratulations",
      template: "paymentInstalmentSuccess",
      html: ``,
      mail_data: {
        user: user.name,
        amount: amount,
        date: date
      }
    }
    await this.mailServiceService.sendMailAsTemplate(obj);
  }

  isDatePassed(dateString) {
    var givenDate = new Date(dateString);
    // Current date
    var currentDate = new Date();
    // Compare the dates
    if (givenDate < currentDate)
      return true
    return false
  }

  async findOne(id: number) {
    const order: any = await this.orderRepository.findOne({
      where: {
        id,
      },
    });
    if (!order.id)
      throw new NotFoundException("No order found");

    order.order_object = JSON.parse(order.order_object);

    const orderObj: any = order.order_object;

    const features = await this.featureService.whereInData(orderObj.features);
    const templates = await this.templateService.whereInData(
      orderObj.templates
    );

    const phases = await this.phasesService.whereInData(orderObj.phases);

    const addons = await this.addonService.whereInData(orderObj.selectedAddons);

    const user = await this.userService.findOne(orderObj.user_id);

    order.features = features;
    order.platforms = orderObj.platforms || [];;
    order.templates = templates;
    order.phases = phases;
    order.addons = addons;
    order.user = user;

    return order;
  }

  async OrdersByUserId(id: number) {
    let orders: any = await this.orderRepository.find({
      where: {
        user_id: id,
      },
      order: { createdAt: "DESC" },
    });
    if (!orders.length)
      throw new NotFoundException("No orders found");
    for (let i = 0; i < orders.length; i++) {
      let ele = orders[i];
      ele.order_object = await JSON.parse(ele.order_object);
      const featureIDsArr: any = ele.order_object.features || [];
      const templatesIDsArr: any = ele.order_object.features || [];
      const phasesIDsArr: any = ele.order_object.phases || [];
      const platformArr: any = ele.order_object.platforms || [];
      const selectedAddonsIDsArr: any = ele.order_object.selectedAddons || [];
      ele.features = await this.featureService.whereInData(featureIDsArr);
      ele.templates = await this.templateService.whereInData(templatesIDsArr);
      ele.phases = await this.phasesService.whereInData(phasesIDsArr);
      ele.addons = await this.addonService.whereInData(selectedAddonsIDsArr);
      ele.platforms = platformArr;
    }
    let user = await this.userService.findOne(id);
    user['orders'] = orders || []
    return user
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  
  async ArchivedOrder(id: number) {
    try {
      const updated = await this.orderRepository.update(id, {payment_status:'Archived'});
      if (updated?.affected <= 0) {
        throw new NotFoundException("Not Found any data against this id.");
      }
      return "Successfully Archived";
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: number) {
    try {
      const phaseDelete = await this.orderRepository.delete(id);
      if (phaseDelete?.affected <= 0) {
        throw new NotFoundException("Not Found any data against this id.");
      }
      return "Successfully removed";
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
