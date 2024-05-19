// import { Module } from "@nestjs/common";
// //import { UsersModule } from 'src/users/users.module';
// import { AuthService } from "./auth.service";
// import { PassportModule } from "@nestjs/passport";
// import { JwtModule } from "@nestjs/jwt";
// import { AuthController } from "./auth.controller";
// import { UsersModule } from "src/users/users.module";
// // import { UsersService } from "src/users/users.service";

// @Module({
//   imports: [
//     UsersModule,

//     PassportModule,
//     JwtModule.register({
//       secret:
//         "django-insecure-j5m89_@u&s#k$(ns&dou0n01z5v4cg%o0y+ezy$1w4fqm(y&8r",
//       signOptions: { expiresIn: "60d" },
//     }),
//   ],
//   providers: [AuthService], //UsersService
//   controllers: [AuthController],
// })
// export class AuthModule {}

import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { jwtConstants } from "./constants";
@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60d" },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
