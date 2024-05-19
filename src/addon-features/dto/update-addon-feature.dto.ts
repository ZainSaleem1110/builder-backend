import { PartialType } from '@nestjs/mapped-types';
import { CreateAddonFeatureDto } from './create-addon-feature.dto';

export class UpdateAddonFeatureDto extends PartialType(CreateAddonFeatureDto) {}
