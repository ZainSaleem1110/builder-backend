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
import { OrderRequirementsService } from "./order-requirements.service";
import { CreateOrderRequirementDto } from "./dto/create-order-requirement.dto";
import { UpdateOrderRequirementDto } from "./dto/update-order-requirement.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("order-requirements")
@UseGuards(AuthGuard)
export class OrderRequirementsController {
  constructor(
    private readonly orderRequirementsService: OrderRequirementsService
  ) {}

  @Post()
  create(@Body() createOrderRequirementDto: CreateOrderRequirementDto) {
    return this.orderRequirementsService.create(createOrderRequirementDto);
  }

  @Get()
  findAll() {
    return this.orderRequirementsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.orderRequirementsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateOrderRequirementDto: UpdateOrderRequirementDto
  ) {
    return this.orderRequirementsService.update(+id, updateOrderRequirementDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.orderRequirementsService.remove(+id);
  }
}
