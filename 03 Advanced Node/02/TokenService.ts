/* eslint-disable @typescript-eslint/no-explicit-any */
//* Reusable class example
import dayjs from "dayjs";
import jwt from "jsonwebtoken";

import { TokenI } from "./models/token.model";

export interface IToken extends TokenI {
  findOne(arg0: { token: string; user: string | (() => string) | undefined; type: string; blacklisted: boolean }): unknown;
  create(arg0: { token: string; user: string; expires: Date; type: string; blacklisted: boolean }): unknown;
}

class TokenService {
  Token: IToken;
  config: any;
  tokenTypes: { ACCESS: string; REFRESH: string };

  constructor(Token: IToken, tokenTypes: { ACCESS: string; REFRESH: string }, config: any) {
    this.Token = Token;
    this.tokenTypes = tokenTypes;
    this.config = config;
  }

  generateToken(userId: string, expires: dayjs.Dayjs, type: string, secret = this.config.jwt.secret) {
    const payload = {
      sub: userId,
      iat: dayjs().unix(),
      exp: expires.unix(),
      type,
    };

    return jwt.sign(payload, secret);
  }

  async saveToken(token: string, userId: string, expires: dayjs.Dayjs, type: string, blacklisted = false) {
    const tokenDoc = await this.Token.create({
      token,
      user: userId,
      expires: expires.toDate(),
      type,
      blacklisted,
    });

    return tokenDoc;
  }

  async verifyToken(token: string, type: string) {
    const payload = jwt.verify(token, this.config.jwt.secret);
    const tokenDoc = await this.Token.findOne({
      token,
      user: payload.sub,
      type,
      blacklisted: false,
    });

    if (!tokenDoc) {
      throw new Error("Token not found");
    }

    return tokenDoc;
  }

  async generateAuthTokens(userId: string) {
    const accessTokenExpires = dayjs().add(this.config.jwt.accessExpirationMinutes, "minutes");
    const accessToken = this.generateToken(userId, accessTokenExpires, this.tokenTypes.ACCESS);
    const refreshTokenExpires = dayjs().add(this.config.jwt.refreshExpirationDays, "days");
    const refreshToken = this.generateToken(userId, refreshTokenExpires, this.tokenTypes.REFRESH);
    await this.saveToken(refreshToken, userId, refreshTokenExpires, this.tokenTypes.REFRESH);

    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate(),
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.toDate(),
      },
    };
  }
}

export default TokenService;
