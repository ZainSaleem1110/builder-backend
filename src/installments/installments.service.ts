import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInstallmentDto } from './dto/create-installment.dto';
import { UpdateInstallmentDto } from './dto/update-installment.dto';
import { Installment } from './entities/installment.entity';

@Injectable()
export class InstallmentsService {
  constructor(
    @InjectRepository(Installment)
    private installmentRepository: Repository<Installment>,
  ) {}

  create(createInstallmentDto: CreateInstallmentDto) {
    return 'This action adds a new installment';
  }

  findAll() {
    return `This action returns all installments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} installment`;
  }

  update(id: number, updateInstallmentDto: UpdateInstallmentDto) {
    return `This action updates a #${id} installment`;
  }

  remove(id: number) {
    return `This action removes a #${id} installment`;
  }
}
