import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";

import { catchAsync } from "../utils/catchAsync";
import { createUser } from "../services/user.service";
import { UserI } from "../models/user.model";
import generateAuthToken from "../services/token.service";
import { loginService } from "../services/auth.service";

export const register: RequestHandler = catchAsync(async (req: Request, res: Response): Promise<void> => {
  // Create a user
  const user: UserI = await createUser(req.body);
  // Generate a JWT for the newly created user
  const token: string = await generateAuthToken(user._id);

  res.status(httpStatus.CREATED).send({ user, token });
});

export const login = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const user = await loginService(email, password);
  // generate token
  const token = await generateAuthToken(user._id);
  res.status(httpStatus.OK).send({ user, token });
});
