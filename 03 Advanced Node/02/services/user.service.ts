import httpStatus from "http-status";

import User, { UserI } from "../models/user.model";
import ApiError from "../utils/ApiError";
// import transporter from "../utils/email-transporter";
// import config from "../config/config";
// import EventEmitter from "../utils/EventEmitter";

export const createUser = async (userBody: { email: string }): Promise<UserI> => {
  // Check if email exists
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email is already taken");
  }

  const user = (await User.create(userBody)) as UserI;

  // await transporter.sendMail(
  //   {
  //     from: config.email,
  //     to: user.email,
  //     subject: "Successfully registered ",
  //     text: "thanks for signing up",
  //   },
  //   (error, info) => {
  //     if (error) {
  //       return console.log({ error });
  //     }
  //     console.log("Email sent: " + info.response);
  //   }
  // );
  // EventEmitter.emit("signup", user);

  return user;
};

export const getUserByEmail = async (email: string): Promise<UserI | null> => {
  return await User.findOne({ email });
};

export const getUserById = async (id: string): Promise<UserI | null> => {
  return await User.findById(id);
};
