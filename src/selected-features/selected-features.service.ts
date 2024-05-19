import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSelectedFeatureDto } from './dto/create-selected-feature.dto';
import { UpdateSelectedFeatureDto } from './dto/update-selected-feature.dto';
import { SelectedFeature } from './entities/selected-feature.entity';

@Injectable()
export class SelectedFeaturesService {
  constructor(
    @InjectRepository(SelectedFeature)
    private selectedFeatureRepository: Repository<SelectedFeature>,
  ) {}
  create(createSelectedFeatureDto: CreateSelectedFeatureDto) {
    return 'This action adds a new selectedFeature';
  }

  findAll() {
    return `This action returns all selectedFeatures`;
  }

  findOne(id: number) {
    return `This action returns a #${id} selectedFeature`;
  }

  update(id: number, updateSelectedFeatureDto: UpdateSelectedFeatureDto) {
    return `This action updates a #${id} selectedFeature`;
  }

  remove(id: number) {
    return `This action removes a #${id} selectedFeature`;
  }
}
