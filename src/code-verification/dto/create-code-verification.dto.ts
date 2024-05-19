import { IsNotEmpty } from 'class-validator';

export class CreateCodeVerificationDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  code: string;
}
