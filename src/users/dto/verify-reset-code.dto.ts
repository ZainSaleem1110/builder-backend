import { IsEmail, IsNotEmpty } from 'class-validator';

export class VerifyCodeDto {
  @IsNotEmpty()
  code: string;

  @IsEmail()
  email: string;
}
