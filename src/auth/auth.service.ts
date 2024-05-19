import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import axios from "axios";
const { OAuth2Client } = require("google-auth-library");
import * as bcrypt from "bcrypt";
const client = new OAuth2Client(
  "159760872037-l5hlbmgh1uv8u3m9n25lh43ciucnm4b8.apps.googleusercontent.com"
);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signUp(signInDto: any) {
    return await this.usersService.create(signInDto);
  }
  async autoLogin(id: number) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException("user not found");
    }

    const payload = { name: user.name, sub: user.id };
    delete user["password"];
    return {
      access_token: await this.jwtService.signAsync(payload),
      user,
      access: user.id,
      refresh: user.id,
    };
  }

  async facebook(access_token: string) {
    try {
      const { data } = await axios.get("https://graph.facebook.com/me", {
        params: {
          client_id: process.env.FACEBOOK_CLIENT_TOKEN,
          client_secret: process.env.FACEBOOK_SECRET_KEY,
          fields: ["id", "email", "name"].join(","),
          access_token: access_token["access_token"],
        },
      });
      const userData = await this.usersService.signInWitheFacebook(data);
      return this.tokenGenerator(userData);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async signInWithLinkedin(access_token: string) {
    try {
      const response = await axios.get("https://api.linkedin.com/v2/me", {
        headers: {
          Authorization: `Bearer ${access_token["access_token"]}`,
        },
      });
      const userId = response.data.id;
      // return response?.data;
      if (response?.data) {
        const userData = await this.usersService.signInWithLinkedin(
          response.data
        );
        delete userData["password"];
        const token = await this.tokenGenerator(userData);
        return token;
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async signIn(username, pass) {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    const passwordComparison = await bcrypt.compare(pass, user.password);

    if (!passwordComparison) {
      throw new UnauthorizedException();
    }
    if (!user.is_verified) {
      throw new BadRequestException(
        "your email is not verified please verify your email first"
      );
    }
    const payload = { name: user.name, sub: user.id };

    user['is_have_password'] = true
    if(!user["password"])
      user['is_have_password'] = false
    delete user["password"];
    return {
      access_token: await this.jwtService.signAsync(payload),
      user,
      access: user.id,
      refresh: user.id,
    };
  }
  async google(access_token: string) {
    try {
      const googleData = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token["access_token"]}`
      );

      if (!googleData) {
        throw new NotFoundException("No user found with this email");
      }

      const user = await this.usersService.google(googleData);

      delete user["password"];

      return this.tokenGenerator(user);
    } catch (error) {
      console.log({ error });
      throw new InternalServerErrorException(error.message);
    }
  }
  async tokenGenerator(user) {
    return {
      access_token: await this.jwtService.signAsync({
        name: user.name,
        sub: user.id,
      }),
      user,
      access: user.id,
      refresh: user.id,
    };
  }

  async getUserByToken(token: string) {
    const decoded: any = await this.jwtService.decode(token);
    const user: any = await this.usersService.findOne(decoded.sub);
    user['is_have_password'] = true
    if(!user["password"])
      user['is_have_password'] = false
    return user;
  }
}
