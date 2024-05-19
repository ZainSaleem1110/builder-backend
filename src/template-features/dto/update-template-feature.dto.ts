import { PartialType } from '@nestjs/mapped-types';
import { CreateTemplateFeatureDto } from './create-template-feature.dto';

export class UpdateTemplateFeatureDto extends PartialType(CreateTemplateFeatureDto) {}
