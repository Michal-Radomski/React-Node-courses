import httpStatus from "http-status";

import User, { UserI } from "../models/user.model";
import ApiError from "../utils/ApiError";

export const createUser = async (userBody: { email: string }): Promise<UserI> => {
  // Check if email exists
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email is already taken");
  }

  const user = (await User.create(userBody)) as UserI;
  return user;
};

export const getUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};
