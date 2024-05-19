import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSelectedAddonDto } from './dto/create-selected-addon.dto';
import { UpdateSelectedAddonDto } from './dto/update-selected-addon.dto';
import { SelectedAddon } from './entities/selected-addon.entity';

@Injectable()
export class SelectedAddonsService {
  constructor(
    @InjectRepository(SelectedAddon)
    private selectedAddonRepository: Repository<SelectedAddon>,
  ) {}
  create(createSelectedAddonDto: CreateSelectedAddonDto) {
    return 'This action adds a new selectedAddon';
  }

  findAll() {
    return `This action returns all selectedAddons`;
  }

  findOne(id: number) {
    return `This action returns a #${id} selectedAddon`;
  }

  update(id: number, updateSelectedAddonDto: UpdateSelectedAddonDto) {
    return `This action updates a #${id} selectedAddon`;
  }

  remove(id: number) {
    return `This action removes a #${id} selectedAddon`;
  }
}
