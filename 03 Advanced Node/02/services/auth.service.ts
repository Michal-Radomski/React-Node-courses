import httpStatus from "http-status";

import { getUserByEmail, getUserById } from "./user.service";
import ApiError from "../utils/ApiError";
import generateAuthTokens, { verifyToken } from "./token.service";
import { tokenTypes } from "../config/tokens";
import { TokenI } from "../models/token.model";
import { UserI } from "../models/user.model";

export const loginService = async (email: string, password: string) => {
  const user = await getUserByEmail(email);

  if (!user || !(await user.isPasswordMatch(password))) {
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
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
};
