import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { User } from "./entities/user.entity";
import { AuthModule } from "src/auth/auth.module";
import { CodeVerificationModule } from "src/code-verification/code-verification.module";
import { MailServiceModule } from "src/mail-service/mail-service.module";

@Module({
  imports: [CodeVerificationModule,MailServiceModule,forwardRef(() => AuthModule), TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
