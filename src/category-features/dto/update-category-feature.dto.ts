import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryFeatureDto } from './create-category-feature.dto';

export class UpdateCategoryFeatureDto extends PartialType(CreateCategoryFeatureDto) {}
