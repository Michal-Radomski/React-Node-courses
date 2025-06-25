import { Strategy as JwtStrategy, ExtractJwt, StrategyOptionsWithoutRequest, VerifyCallback } from "passport-jwt";

import config from "./config";
import { tokenTypes } from "./tokens";
import { getUserById } from "../services/user.service";
import { UserI } from "../models/user.model";

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
} as StrategyOptionsWithoutRequest;

const jwtVerify: VerifyCallback = async (
  payload: { type: string; sub: string },
  done: (arg0: unknown, arg1: boolean | Promise<UserI | null>) => void
) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error("Invalid token type");
    }
    const user = getUserById(payload.sub);

    if (!user) {
      return done(null, false);
    }

    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

export const jwtStrategy: JwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
