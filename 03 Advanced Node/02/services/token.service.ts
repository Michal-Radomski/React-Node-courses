import jwt from "jsonwebtoken";
import dayjs from "dayjs";

import config from "../config/config";
import { tokenTypes } from "../config/tokens";

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

const generateToken = (userId: string, expires: dayjs.Dayjs, type: string, secret = config.jwt.secret): string => {
  const payload = {
    sub: userId,
    iat: dayjs().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const generateAuthTokens = (userId: string) => {
  const accessTokenExpires: dayjs.Dayjs = dayjs().add(Number(config.jwt.accessExpirationMinutes), "minutes");
  const accessToken: string = generateToken(userId, accessTokenExpires, tokenTypes.ACCESS);

  const refreshTokenExpires: dayjs.Dayjs = dayjs().add(Number(config.jwt.refreshExpirationDays), "days");
  const refreshToken: string = generateToken(userId, refreshTokenExpires, tokenTypes.REFRESH);
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
