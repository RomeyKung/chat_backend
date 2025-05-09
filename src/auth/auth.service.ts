import { Injectable } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";
import { ConfigService } from "@nestjs/config";
import { TokenPayload } from "./token-payload.interface";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async login(user: User, response: Response) {
    // console.log("User", user.email, user.password);
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + this.configService.getOrThrow("JWT_EXPIRATION"));

    const tokenPayload: TokenPayload = {
      _id: user._id.toHexString(),
      email: user.email,
    };

    const token = this.jwtService.sign(tokenPayload);

    response.cookie("Authentication", token, {
      httpOnly: true, // protect JavaScript code from unauthorized access
      expires: expires, // set expires cookie
    });
  }

  async logout(response: Response) {
    response.cookie("Authentication", "", {
      httpOnly: true, // protect JavaScript code from unauthorized access
      expires: new Date(), // set expires cookie
    });
  }
}
