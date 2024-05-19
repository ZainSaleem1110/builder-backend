import { PartialType } from '@nestjs/mapped-types';
import { CreateSelectedAddonDto } from './create-selected-addon.dto';

export class UpdateSelectedAddonDto extends PartialType(CreateSelectedAddonDto) {}
