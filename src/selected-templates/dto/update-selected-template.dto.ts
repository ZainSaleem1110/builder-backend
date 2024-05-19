import { PartialType } from '@nestjs/mapped-types';
import { CreateSelectedTemplateDto } from './create-selected-template.dto';

export class UpdateSelectedTemplateDto extends PartialType(CreateSelectedTemplateDto) {}
