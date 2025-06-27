import httpStatus from "http-status";
import mongoose from "mongoose";
import { RateLimiterMongo, RateLimiterRes } from "rate-limiter-flexible";

import { getUserByEmail, getUserById } from "./user.service";
import ApiError from "../utils/ApiError";
import generateAuthTokens, { verifyToken } from "./token.service";
import { tokenTypes } from "../config/tokens";
import { TokenI } from "../models/token.model";
import { UserI } from "../models/user.model";
import config from "../config/config";

export const loginService = async (email: string, password: string, ipAddr: string): Promise<UserI> => {
  //* Without copy error!
  const rateLimiterOptions = {
    storeClient: mongoose.connection,
    blockDuration: 60 * 60 * 24, // 24h
    dbName: "blog_app",
  };

  const emailIpBruteLimiter = new RateLimiterMongo({
    ...rateLimiterOptions,
    points: config.rateLimiter.maxAttemptsByIpUsername,
    duration: 60 * 10, // 10 minutes
  });

  const slowerBruteLimiter = new RateLimiterMongo({
    ...rateLimiterOptions,
    points: config.rateLimiter.maxAttemptsPerDay,
    duration: 60 * 60 * 24, // 24h
  });

  const emailBruteLimiter = new RateLimiterMongo({
    ...rateLimiterOptions,
    points: config.rateLimiter.maxAttemptsPerEmail,
    duration: 60 * 60 * 24, // 24h
  });

  const promises = [slowerBruteLimiter.consume(ipAddr)] as Promise<RateLimiterRes>[];
  // console.log("promises:", promises);

  const user = (await getUserByEmail(email)) as UserI;

  if (!user || !(await user.isPasswordMatch(password))) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    user && promises.push(emailIpBruteLimiter.consume(`${email}_${ipAddr}`), emailBruteLimiter.consume(email));
    await Promise.all(promises);
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  return user;
};

export const refreshAuthToken = async (refreshToken: string) => {
  try {
    const refreshTokenDoc = (await verifyToken(refreshToken, tokenTypes.REFRESH)) as TokenI;
    const user = (await getUserById(refreshTokenDoc.user as string)) as UserI;

    if (!user) {
      throw new Error();
    }

    await refreshTokenDoc.deleteOne();
    return generateAuthTokens(user.id);
  } catch (error) {
    console.log("error:", error);
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
};
