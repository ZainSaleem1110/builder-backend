import { PartialType } from '@nestjs/mapped-types';
import { CreateSelectedFeatureDto } from './create-selected-feature.dto';

export class UpdateSelectedFeatureDto extends PartialType(CreateSelectedFeatureDto) {}
