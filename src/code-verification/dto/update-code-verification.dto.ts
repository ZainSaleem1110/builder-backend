import { PartialType } from '@nestjs/mapped-types';
import { CreateCodeVerificationDto } from './create-code-verification.dto';

export class UpdateCodeVerificationDto extends PartialType(CreateCodeVerificationDto) {}
