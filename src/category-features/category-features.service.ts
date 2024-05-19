import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryFeatureDto } from './dto/create-category-feature.dto';
import { UpdateCategoryFeatureDto } from './dto/update-category-feature.dto';
import { CategoryFeature } from './entities/category-feature.entity';

@Injectable()
export class CategoryFeaturesService {
  constructor(
    @InjectRepository(CategoryFeature)
    private categoryFeatureRepository: Repository<CategoryFeature>,
  ) {}

  create(createCategoryFeatureDto: CreateCategoryFeatureDto) {
    return this.categoryFeatureRepository.insert({
      category_id: createCategoryFeatureDto.category_id,
      feature_id: createCategoryFeatureDto.feature_id,
    });
  }

  findAll() {
    return `This action returns all categoryFeatures`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoryFeature`;
  }

  update(id: number, updateCategoryFeatureDto: UpdateCategoryFeatureDto) {
    return `This action updates a #${id} categoryFeature`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoryFeature`;
  }
}
