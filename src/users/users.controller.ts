import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthService } from "src/auth/auth.service";
import { AuthGuard } from "src/auth/auth.guard";
import { VerifyCodeDto } from "./dto/verify-code.dto";
import { get } from "http";

@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService
  ) {}
  @UseGuards(AuthGuard)
  @Get("/profile")
  getProfile(@Request() req) {
    return this.usersService.findOne(req.user.sub);
  }

  @Post("/token")
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.signIn(loginUserDto.email, loginUserDto.password);
  }

  // test
  @Post("/linkedin")
  linkedin(@Body() access_token: string) {
    return this.authService.signInWithLinkedin(access_token);
  }

  @Post("/seed")
  seedAdmin(@Body() test: string) {
    return this.usersService.seedAdmin();
  }

  @Post("/google")
  google(@Body() access_token: string) {
    return this.authService.google(access_token);
  }
  @Post("/facebook")
  facebook(@Body() access_token: string) {
    return this.authService.facebook(access_token);
  }
  @Post("/verifyCode")
  verifyCode(@Body() verifyCode: VerifyCodeDto) {
    console.log("VERIFY CODE");
    return this.usersService.verificationCode(verifyCode);
  }

  @Post("/resetVerificationCode")
  resetVerificationCode(@Body() email: { email: string }) {
    return this.usersService.resendVerificationCode(email);
  }

  @Post("/resendCode")
  resendCodeAfter60Sec(@Body() email: { email: string }) {
    return this.usersService.resendCodeAfter60Sec(email);
  }

  @Post("/changePassword")
  changePassword(
    @Body() body: { email: string; password: string; code: string }
  ) {
    return this.usersService.changePassword(body);
  }

  @Get("/autologin/:id")
  autologin(@Param("id") id: string) {
    return this.authService.autoLogin(+id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Get("/card/remove/:id")
  removeCards(@Param("id") id: string) {
    return this.usersService.removeCards(+id);
  }
  


  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Post("/cards")
  updateUserCards(@Body() data: any) {
    return this.usersService.updateUserCards(data);
  }

  @Get("/removeuser/:id")
  removeUser(@Param("id") id: string) {
    return this.usersService.removeUser(+id);
  }
}
