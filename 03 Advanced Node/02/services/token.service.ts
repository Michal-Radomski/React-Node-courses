import jwt from "jsonwebtoken";
import dayjs from "dayjs";

import config from "../config/config";
import { tokenTypes } from "../config/tokens";

// Function to generate a JWT for a given user ID
const generateAuthToken = (userId: string): string => {
  // Payload includes subject (user ID), issued at time, expiration time, and token type
  const payload = {
    sub: userId,
    iat: dayjs().unix(), // Issued at: current Unix timestamp
    exp: dayjs().add(Number(config.jwt.accessExpirationMinutes), "minutes").unix(), // Expires in 30 minutes
    type: tokenTypes.ACCESS, // Token type: access
  };

  // Sign the token with the secret key
  return jwt.sign(payload, config.jwt.secret);
};

export default generateAuthToken;
