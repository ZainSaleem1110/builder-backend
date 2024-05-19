import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSelectedPlatformDto } from './dto/create-selected-platform.dto';
import { UpdateSelectedPlatformDto } from './dto/update-selected-platform.dto';
import { SelectedPlatform } from './entities/selected-platform.entity';

@Injectable()
export class SelectedPlatformsService {
  constructor(
    @InjectRepository(SelectedPlatform)
    private selectedPlatformRepository: Repository<SelectedPlatform>,
  ) {}
  create(createSelectedPlatformDto: CreateSelectedPlatformDto) {
    return 'This action adds a new selectedPlatform';
  }

  findAll() {
    return `This action returns all selectedPlatforms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} selectedPlatform`;
  }

  update(id: number, updateSelectedPlatformDto: UpdateSelectedPlatformDto) {
    return `This action updates a #${id} selectedPlatform`;
  }

  remove(id: number) {
    return `This action removes a #${id} selectedPlatform`;
  }
}
