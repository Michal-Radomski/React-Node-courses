import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jwt-simple";

import UserModel, { IModel } from "../UserModel";

const secretKey = process.env.secret_key as string;
// console.log({ secretKey });

interface CustomRequest extends Request {
  user: IModel;
}

function tokenForUser(user: IModel): string {
  const timeStamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timeStamp, email: user.email }, secretKey);
}

export const signUp: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  // console.log("req.ip:", req.ip);
  // console.log("req.body:", req.body);
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).json({
      message: "422, Please fill all the fields",
    });
  }

  if (password.length < 8) {
    return res.status(422).json({
      message: "422, Password is too short",
    });
  }

  try {
    // res.send({ success: true, message: "true" });
    // See if user with given email exists
    const user: IModel | null = await UserModel.findOne({ email: email }, (err: Error) => {
      if (err) {
        return next(err);
      }
    });
    // console.log("user:", user);
    // res.send({ user });

    // If a user exists, return an error
    if (user) {
      return res.status(422).send({ error: "422, User already exist!" });
    }

    // If a user does not exist, create and save user record
    const newUser = new UserModel({ email, password });
    // console.log({ newUser });
    newUser.save((err) => {
      if (err) {
        return next(err);
      }
    });

    // Respond to request: the user was created
    return res.status(201).json({
      message: "201, User registered",
      token: tokenForUser(newUser),
    });
  } catch (error) {
    console.log({ error });
    res.status(404).json(error);
  }
};

export const getMessage: RequestHandler = async (_req: Request, res: Response): Promise<void> => {
  await res.send({ message: "hi there!" });
};

export const signIn = async (req: CustomRequest, res: Response): Promise<void> => {
  // console.log("req:", req);
  await res.status(200).send({ token: tokenForUser(req.user) });
};
