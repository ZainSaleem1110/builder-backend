import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  oldPassword?: string;
  confirmPassword?: string;
  handle_media_scenario_password? : boolean
}
