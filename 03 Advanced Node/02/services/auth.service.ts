import httpStatus from "http-status";

import { getUserByEmail } from "./user.service";
import ApiError from "../utils/ApiError";

export const loginService = async (email: string, password: string) => {
  const user = await getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  return user;
};
