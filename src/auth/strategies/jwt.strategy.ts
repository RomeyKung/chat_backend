import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TokenPayload } from "../token-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => request?.cookies?.Authentication]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow("JWT_SECRET"),
    });
  }

  async validate(payload: TokenPayload) {
    // console.log("JWT Payload:", payload);
    //request.user = return automatically
    // return { _id: payload._id, email: payload.email };
    return payload;
  }
}
