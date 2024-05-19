import { PartialType } from '@nestjs/mapped-types';
import { CreateSelectedPlatformDto } from './create-selected-platform.dto';

export class UpdateSelectedPlatformDto extends PartialType(CreateSelectedPlatformDto) {}
