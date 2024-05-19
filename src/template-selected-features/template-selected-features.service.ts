import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTemplateSelectedFeatureDto } from './dto/create-template-selected-feature.dto';
import { UpdateTemplateSelectedFeatureDto } from './dto/update-template-selected-feature.dto';
import { TemplateSelectedFeature } from './entities/template-selected-feature.entity';

@Injectable()
export class TemplateSelectedFeaturesService {
  constructor(
    @InjectRepository(TemplateSelectedFeature)
    private templateSelectedFeatureRepository: Repository<TemplateSelectedFeature>,
  ) {}
  create(createTemplateSelectedFeatureDto: CreateTemplateSelectedFeatureDto) {
    return 'This action adds a new templateSelectedFeature';
  }

  findAll() {
    return `This action returns all templateSelectedFeatures`;
  }

  findOne(id: number) {
    return `This action returns a #${id} templateSelectedFeature`;
  }

  update(
    id: number,
    updateTemplateSelectedFeatureDto: UpdateTemplateSelectedFeatureDto,
  ) {
    return `This action updates a #${id} templateSelectedFeature`;
  }

  remove(id: number) {
    return `This action removes a #${id} templateSelectedFeature`;
  }
}
