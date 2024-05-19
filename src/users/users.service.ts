import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { CodeVerificationService } from "src/code-verification/code-verification.service";
import { VerifyCodeDto } from "./dto/verify-code.dto";
import { generateRandom5DigitNumber, sendEmail } from "src/utils/functions";
import { MailServiceService } from "src/mail-service/mail-service.service";

@Injectable()
export class UsersService {
  async signInWitheFacebook(data) {
    // email: data.email ?? `${data.id}@facebook.com`,
    const idCheck = await this.userRepository.findOne({
      where: {
        extra_id: data["id"],
      },
    });
    if (idCheck) {
      return idCheck;
    }
    const created = await this.userRepository.insert({
      name: data.name,
      extra_id: data["id"],
      email: data.email ?? `${data.id}@facebook.com`,
      phone: "",
      currency: "",
      password: "",
      register_via: "facebook",
      company_size: "",
      company_role: "",
      user_role: "",
    });
    return await this.userRepository.findOne({
      where: {
        extra_id: created["identifiers"]["id"],
      },
    });
  }
  constructor(
    @InjectRepository(User)
    // private readonly mailServiceService: MailServiceService
    private userRepository: Repository<User>,
    private codeVerification: CodeVerificationService,
    private mailServiceService: MailServiceService
  ) { }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: loginUserDto.username,
        password: loginUserDto.password,
      },
    });
    return { user, access: user.id, refresh: user.id };
  }

  async verificationCode(verifyCode: VerifyCodeDto) {
    try {
      const userExists = await this.findByUsername(verifyCode.email);
      if (!userExists) {
        throw new HttpException("email does not exist", HttpStatus.BAD_REQUEST);
      }
      const { code, id } = await this.codeVerification.findOneByUserId(
        userExists.id
      );

      if (!code) {
        throw new NotFoundException("not found");
      }
      if (!(code === verifyCode.code)) {
        throw new NotFoundException("Incorrect code");
      }
      await this.userRepository.save({
        ...userExists,
        is_verified: true,
      });
      await this.codeVerification.remove(id);
      return "Verified";
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async resendVerificationCode({ email }) {
    try {
      const exist = await this.findByUsername(email);
      if (!exist) {
        throw new HttpException("email does not exist", HttpStatus.BAD_REQUEST);
      }
      const randomNumber = generateRandom5DigitNumber();
      await this.codeVerification.create({
        userId: exist.id,
        code: randomNumber.toString(),
      });

      let obj = {
        to: email,
        subject: "Verification Code",
        template: "resetpassword",
        html: ``,
        mail_data: {
          user: exist.name,
          code: randomNumber
        }
      }
      await this.mailServiceService.sendMailAsTemplate(obj);
      // await sendEmail({ receiver: email, code: randomNumber });
      return { message: "Code Sent to your Email" };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async resendCodeAfter60Sec({ email }) {
    try {
      const exist = await this.findByUsername(email);
      if (!exist) {
        throw new HttpException("email does not exist", HttpStatus.BAD_REQUEST);
      }
      // remove previous code if exists 
      await this.codeVerification.removeByUserId(exist.id)
      const randomNumber = generateRandom5DigitNumber();
      await this.codeVerification.create({
        userId: exist.id,
        code: randomNumber.toString(),
      });

      let obj = {
        to: email,
        subject: "Verification Code",
        template: "verifyemail",
        html: ``,
        mail_data: {
          user: exist.name,
          code: randomNumber
        }
      }
      await this.mailServiceService.sendMailAsTemplate(obj);
      // await sendEmail({ receiver: email, code: randomNumber });
      return { message: "Code Sent to your Email" };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async changePassword({ email, password, code }) {
    try {
      const response = await this.verificationCode({
        email,
        code,
      });

      if (response == "Verified") {
        const user = await this.findByUsername(email);
        const hash = await bcrypt.hash(password, 6);
        await this.userRepository.update(user.id, {
          password: hash,
        });

        let obj = {
          to: user.email,
          subject: "Password Changed",
          template: "passwordChanged",
          html: ``,
          mail_data: {
            user: user.name,
          }
        }
        await this.mailServiceService.sendMailAsTemplate(obj);
        return { message: "Password changed" };
      } else {
        throw new HttpException("Code verification failed!", 401);
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async create(createUserDto: CreateUserDto) {
    try {
      const emailCheck = await this.userRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });
      if (emailCheck) {
        throw new ConflictException("User already exist");
      }
      const created = await this.userRepository.create({
        name: createUserDto.name,
        email: createUserDto.email,
        phone: createUserDto.phone,
        currency: createUserDto.currency,
        password: createUserDto.password,
        register_via: createUserDto.register_via,
        company_size: createUserDto.company_size,
        company_role: createUserDto.company_role,
        user_role: "user",
      });
      const savedUser = await this.userRepository.save(created);
      const randomNumber = generateRandom5DigitNumber();
      await this.codeVerification.create({
        userId: savedUser.id,
        code: randomNumber.toString(),
      });

      let obj = {
        to: createUserDto.email,
        subject: "Verification Code",
        template: "verifyemail",
        html: ``,
        mail_data: {
          user: createUserDto.name,
          code: randomNumber
        }
      }
      await this.mailServiceService.sendMailAsTemplate(obj);
      // await sendEmail({ receiver: createUserDto.email, code: randomNumber });
      return created;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async signInWithLinkedin(data) {
    const idCheck = await this.userRepository.findOne({
      where: {
        extra_id: data["id"],
      },
    });
    if (idCheck) {
      return idCheck;
    }
    const created = await this.userRepository.insert({
      name: data.localizedFirstName,
      extra_id: data["id"],
      email: "",
      phone: "",
      currency: "",
      password: "",
      register_via: "linkedin",
      company_size: "",
      company_role: "",
      user_role: "",
      is_verified: true,
    });
    return await this.userRepository.findOne({
      where: {
        extra_id: created["identifiers"]["id"],
      },
    });
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async updateUserCustomerId(data: any) {
    try {
      let { user_id: id, customer_id } = data;
      await this.userRepository.update(id, {
        customer_id: customer_id
      });
    } catch (error) {
      return "Something went wrong!";
    }
  }



  async updateUserCards(cardsData: any) {
    try {
      let { user_id: id, cards = [] } = cardsData;
      let cardsStr = JSON.stringify(cards)
      const user = await this.findOne(id);
      let res: any = ''
      if (user.id) {
        res = await this.userRepository.update(user.id, {
          card_details: cardsStr
        });
        if (res.affected < 1)
          return "Failed while updating cards";
        return "Success fully updated";
      }
      return "User does not exist!";
    } catch (error) {
      return "Something went wrong!";
    }
  }


  async handlePassForScenario(data: any) {
    try {
      let { user_id: id, password = '' } = data;
      const hash = await bcrypt.hash(password, 6);
      let res = await this.userRepository.update(id, {
        password: hash,
      });
      if (res.affected < 1)
        return "Failed while updating Password";
      return "Password successfully updated";
    } catch (error) {
      return "Something went wrong!";
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findOne(id);

      // handle scenario for social media user signup, they dont have pass , 
      if (updateUserDto.handle_media_scenario_password) {
        return await this.handlePassForScenario({ user_id: user.id, password: updateUserDto.password })
      }

      if (user) {
        let password = user.password;
        if (updateUserDto.password) {
          if (
            updateUserDto.oldPassword &&
            updateUserDto.confirmPassword &&
            updateUserDto.password == updateUserDto.confirmPassword
          ) {
            const passwordComparison = await bcrypt.compare(
              updateUserDto.oldPassword,
              user.password
            );
            if (passwordComparison) {
              password = await bcrypt.hash(updateUserDto.password, 6);
            } else {
              return "Wrong old password!";
            }
          } else {
            return "Confirm Password should be matched with new password!";
          }
        }
        await this.userRepository.update(user.id, {
          name: updateUserDto.name ?? user.name,
          email: updateUserDto.email ?? user.email,
          phone: updateUserDto.phone ?? user.phone,
          currency: updateUserDto.currency ?? user.currency,
          password: password,
          profile_picture:
            updateUserDto.profile_picture ?? user.profile_picture,
        });

        return "Profile has been updated!";
      }
      return "User does not exist!";
    } catch (error) {
      return "Something went wrong!";
    }
  }

  async findByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        email: username,
      },
    });
    return user;
  }

  async removeUser(id: number) {
    try {
      const phaseDelete = await this.userRepository.delete(id);
      if (phaseDelete?.affected <= 0) {
        throw new NotFoundException("Not Found any data against this id.");
      }
      return "Successfully removed";
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async google(createUserInput) {
    const idCheck = await this.userRepository.findOne({
      where: {
        email: createUserInput.data.email,
      },
    });
    if (idCheck) {
      return idCheck;
    }
    const created = await this.userRepository.insert({
      name: createUserInput.data.name,
      extra_id: createUserInput.data.sub,
      email: createUserInput.data.email,
      phone: "",
      currency: "",
      password: "",
      register_via: "google",
      company_size: "",
      company_role: "",
      user_role: "",
      is_verified: true,
    });
    return await this.userRepository.findOne({
      where: {
        extra_id: created["identifiers"]["id"],
      },
    });
  }

  async removeCard(id: number) {
    try {
      let res = await this.userRepository.update(id, {
        card_details: null
      });
      if (res?.affected <= 0) {
        throw new NotFoundException("Not Found any data against this id.");
      }
      return "Successfully removed";
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async removeCards(id: number) { // just for testing
    try {
      let users = await this.userRepository.find();
      for (let i = 0; i < users.length; i++) {
        const e = users[i];
        if (e.card_details) {
          await this.userRepository.update(e.id, {
            card_details: null
          })
        }
      }
      return "Successfully removed cards";
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }



  async seedAdmin() {
    return this.userRepository.insert({
      name: "Admin User",
      phone: "",
      currency: "USD",
      password: "admin123",
      register_via: "email",
      email: "admin@gmail.com",
      user_role: "admin",
    });
  }

  generatePassword(password: string) { }

  replaceSpaces(str, replacement) {
    return str.replace(/\s+/g, replacement);
  }
}
