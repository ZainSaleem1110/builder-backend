import { PartialType } from '@nestjs/mapped-types';
import { CreateTemplateSelectedFeatureDto } from './create-template-selected-feature.dto';

export class UpdateTemplateSelectedFeatureDto extends PartialType(CreateTemplateSelectedFeatureDto) {}
