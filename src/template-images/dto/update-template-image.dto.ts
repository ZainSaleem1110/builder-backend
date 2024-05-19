import { PartialType } from '@nestjs/mapped-types';
import { CreateTemplateImageDto } from './create-template-image.dto';

export class UpdateTemplateImageDto extends PartialType(CreateTemplateImageDto) {}
