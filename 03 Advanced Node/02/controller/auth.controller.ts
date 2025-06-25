import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";

import { catchAsync } from "../utils/catchAsync";
import { createUser } from "../services/user.service";
import { UserI } from "../models/user.model";
import { loginService } from "../services/auth.service";
import generateAuthTokens from "../services/token.service";

export const register: RequestHandler = catchAsync(async (req: Request, res: Response): Promise<void> => {
  // Create a user
  const user: UserI = await createUser(req.body);

  // Generate a JWT for the newly created user
  const tokens = await generateAuthTokens(user.id);

  res.status(httpStatus.CREATED).send({ user, tokens });
});

export const login: RequestHandler = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const user = await loginService(email, password);

  // Generate token
  const tokens = await generateAuthTokens(user.id);

  res.status(httpStatus.OK).send({ user, tokens });
});
