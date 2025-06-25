import jwt from "jsonwebtoken";
import dayjs from "dayjs";

import config from "../config/config";
import { tokenTypes } from "../config/tokens";
import Token, { TokenI } from "../models/token.model";

// Function to generate a JWT for a given user ID
// const generateAuthToken = (userId: string): string => {
//   // Payload includes subject (user ID), issued at time, expiration time, and token type
//   const payload = {
//     sub: userId,
//     iat: dayjs().unix(), // Issued at: current Unix timestamp
//     exp: dayjs().add(Number(config.jwt.accessExpirationMinutes), "minutes").unix(), // Expires in 30 minutes
//     type: tokenTypes.ACCESS, // Token type: access
//   };

//   // Sign the token with the secret key
//   return jwt.sign(payload, config.jwt.secret);
// };

// export default generateAuthToken;

const saveToken = async (
  token: string,
  userId: string,
  expires: dayjs.Dayjs,
  type: string,
  blacklisted: boolean = false
): Promise<TokenI> => {
  const tokenDoc = (await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  })) as TokenI;

  return tokenDoc;
};

export const verifyToken = async (token: string, type: string): Promise<TokenI> => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = (await Token.findOne({
    token,
    user: payload.sub,
    type,
    blacklisted: false,
  })) as TokenI;

  if (!tokenDoc) {
    throw new Error("Token not found");
  }

  return tokenDoc;
};

export const generateToken = (userId: string, expires: dayjs.Dayjs, type: string, secret = config.jwt.secret): string => {
  const payload = {
    sub: userId,
    iat: dayjs().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const generateAuthTokens = async (userId: string) => {
  const accessTokenExpires: dayjs.Dayjs = dayjs().add(Number(config.jwt.accessExpirationMinutes), "minutes");
  const accessToken: string = generateToken(userId, accessTokenExpires, tokenTypes.ACCESS);

  const refreshTokenExpires: dayjs.Dayjs = dayjs().add(Number(config.jwt.refreshExpirationDays), "days");
  const refreshToken: string = generateToken(userId, refreshTokenExpires, tokenTypes.REFRESH);

  await saveToken(refreshToken, userId, refreshTokenExpires, tokenTypes.REFRESH);

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
};

export default generateAuthTokens;
