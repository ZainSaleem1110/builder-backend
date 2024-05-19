import { PartialType } from '@nestjs/mapped-types';
import { CreateFeatureImageDto } from './create-feature-image.dto';

export class UpdateFeatureImageDto extends PartialType(CreateFeatureImageDto) {}
