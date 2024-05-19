import { PartialType } from '@nestjs/mapped-types';
import { CreateSelectedPhaseDto } from './create-selected-phase.dto';

export class UpdateSelectedPhaseDto extends PartialType(CreateSelectedPhaseDto) {}
