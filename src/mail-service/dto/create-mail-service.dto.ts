import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateMailServiceDto {
  @IsEmail()
  to: string;
  @IsNotEmpty()
  subject: string;
  @IsNotEmpty()
  template: string;
  @IsNotEmpty()
  html: string;
  //@IsNotEmpty()
  //context: JSON;
}
