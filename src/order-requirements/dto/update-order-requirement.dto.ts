import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderRequirementDto } from './create-order-requirement.dto';

export class UpdateOrderRequirementDto extends PartialType(CreateOrderRequirementDto) {}
