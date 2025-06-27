import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";

import { catchAsync } from "../utils/catchAsync";
import { createUser } from "../services/user.service";
import { UserI } from "../models/user.model";
import { loginService, refreshAuthToken } from "../services/auth.service";
import generateAuthTokens from "../services/token.service";
import TokenService, { IToken } from "../TokenService";
import Token from "../models/token.model";
import { tokenTypes } from "../config/tokens";
import config from "../config/config";

const tokenService = new TokenService(Token as unknown as IToken, tokenTypes, config);

export const register: RequestHandler = catchAsync(async (req: Request, res: Response): Promise<void> => {
  // Create a user
  const user: UserI = await createUser(req.body);

  // Generate a JWT for the newly created user
  // const tokens = await generateAuthTokens(user.id); //* V1
  const tokens = await tokenService.generateAuthTokens(user.id); //* V2

  res.status(httpStatus.CREATED).send({ user, tokens });
});

export const login: RequestHandler = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const user: UserI = await loginService(email, password, req.connection.remoteAddress as string);

  // Generate token
  const tokens = await generateAuthTokens(user.id as string);

  res.status(httpStatus.OK).send({ user, tokens });
});

export const refreshToken: RequestHandler = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const tokens = await refreshAuthToken(req.body.refreshToken);

  res.status(httpStatus.OK).send({ ...tokens });
});
