// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
// } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post()
//   create(@Body() createAuthDto: CreateAuthDto) {
//     return this.authService.create(createAuthDto);
//   }

//   @Get()
//   findAll() {
//     return this.authService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.authService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
//     return this.authService.update(+id, updateAuthDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.authService.remove(+id);
//   }
// }

// import { Controller, Request, Post, UseGuards } from "@nestjs/common";
// import { AuthService } from "./auth.service";
// import { AuthGuard } from "@nestjs/passport";

// @Controller()
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   @UseGuards(AuthGuard("local"))
//   @Post("auth/login")
//   async login(@Request() req) {
//     return this.authService.login(req.user);
//   }
// }

import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Param,
} from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post("signup")
  signUp(@Body() signInDto: Record<string, any>) {
    return this.authService.signUp(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get("getuser/:token")
  getUser(@Param("token") token: string) {
    return this.authService.getUserByToken(token);
  }
}
