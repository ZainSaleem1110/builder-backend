import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderRequirementDto } from './dto/create-order-requirement.dto';
import { UpdateOrderRequirementDto } from './dto/update-order-requirement.dto';
import { OrderRequirement } from './entities/order-requirement.entity';

@Injectable()
export class OrderRequirementsService {
  constructor(
    @InjectRepository(OrderRequirement)
    private orderRequirementRepository: Repository<OrderRequirement>,
  ) {}

  create(createOrderRequirementDto: CreateOrderRequirementDto) {
    return 'This action adds a new orderRequirement';
  }

  findAll() {
    return `This action returns all orderRequirements`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderRequirement`;
  }

  update(id: number, updateOrderRequirementDto: UpdateOrderRequirementDto) {
    return `This action updates a #${id} orderRequirement`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderRequirement`;
  }
}
